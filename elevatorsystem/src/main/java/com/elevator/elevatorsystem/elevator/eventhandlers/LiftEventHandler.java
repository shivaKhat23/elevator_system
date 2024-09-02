package com.elevator.elevatorsystem.elevator.eventhandlers;

import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestDirection;
import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestEvent;
import com.elevator.elevatorsystem.elevator.controller.event.LiftStopAddEvent;
import com.elevator.elevatorsystem.elevator.controller.mapper.LiftMapper;
import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.domain.Lift;
import com.elevator.elevatorsystem.elevator.domain.LiftStatus;
import com.elevator.elevatorsystem.elevator.service.FloorService;
import com.elevator.elevatorsystem.elevator.service.LiftService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@Slf4j
public class LiftEventHandler {

    private final String TOPIC = "/topic/%s/lift";
    private final FloorService floorService;
    private final LiftService liftService;
    private final SimpMessagingTemplate messagingTemplate;
    private final LiftMapper liftMapper;

    @Autowired
    public LiftEventHandler(FloorService floorService, LiftService liftService, SimpMessagingTemplate messagingTemplate, LiftMapper liftMapper) {
        this.floorService = floorService;
        this.liftService = liftService;
        this.messagingTemplate = messagingTemplate;
        this.liftMapper = liftMapper;
    }

    @Async
    @EventListener
    void handleLiftStopAdd(LiftStopAddEvent event) throws InterruptedException {
        log.info("Handling LiftStopAddEvent: {} at thread: {}", event, Thread.currentThread());
        Floor floor = getFloorFromDB(event.floorId());
        if (floor == null) {
            return;
        }
        UUID buildingId = floor.getBuilding().getId();
        String topic = String.format(TOPIC, buildingId);

        Optional<Lift> liftOptional = liftService.getLiftById(event.liftId());
        if (liftOptional.isEmpty()) {
            log.info("Lift with id {} not found", event.liftId());
            return;
        }
        Lift lift = liftOptional.get();
        boolean stopAdded = lift.addStop(floor);
        liftService.saveLift(lift);
        if (stopAdded) {
            sendLiftUpdate(lift, topic);
            beginLiftMoment(lift.getId());
        }
    }

    private Floor getFloorFromDB(UUID floorId) {
        // Fetch the requested floor
        Optional<Floor> floorOptional = floorService.getFloor(floorId);
        if (floorOptional.isEmpty()) {
            log.info("Floor with id {} not found", floorId);
            return null;
        }
        return floorOptional.get();
    }

    @Async
    @EventListener
    void handleLiftRequest(LiftRequestEvent liftRequestEvent) throws InterruptedException {
        log.info("Handling lift request: {} at thread: {}", liftRequestEvent, Thread.currentThread());

        // Fetch the requested floor
        Floor floor = getFloorFromDB(liftRequestEvent.floorId());
        if (floor == null) {
            return;
        }
        UUID buildingId = floor.getBuilding().getId();
        List<Lift> lifts = liftService.getLiftsForBuilding(buildingId);

        // Find an available lift
        Lift lift = getOptimalLift(lifts, floor, liftRequestEvent.direction());
        if (lift == null) {
            log.warn("No lift available for building at the moment");
            return;
        }
        handleLiftStopAdd(new LiftStopAddEvent(liftRequestEvent.buildingId(), lift.getId(), floor.getId()));
    }

    private Lift getOptimalLift(List<Lift> lifts, Floor floor, LiftRequestDirection direction) {
        return LiftUtil.findOptimalLift(lifts, floor, direction);
    }

    private void beginLiftMoment(UUID liftId) throws InterruptedException {
        Lift lift = getLiftFromDB(liftId);
        if (lift == null) {
            return;
        }
        if (lift.getStatus() == LiftStatus.IDLE) {
            while (lift != null && lift.hasStops()) {
                processLiftMovement(lift, lift.getFloorStops().get(0), lift.getBuilding().getId());
                // at then end of process verify that there is no stop left
                lift = getLiftFromDB(liftId);
            }
        }

    }

    private Lift getLiftFromDB(UUID liftId) {
        Optional<Lift> liftOptional = liftService.getLiftById(liftId);
        if (liftOptional.isEmpty()) {
            log.info("Lift with id {} not found", liftId);
            return null;
        }
        Lift lift = liftOptional.get();
        return lift;
    }

    private void processLiftMovement(Lift lift, Floor floor, UUID buildingId) throws InterruptedException {
        Integer floorNumberToGoto = floor.getNumber();
        Integer currentLiftFloorNumber = lift.getCurrentFloor().getNumber();
        String buildingTopic = String.format(TOPIC, buildingId);

        if (floorNumberToGoto.equals(currentLiftFloorNumber)) {
            handleIdleLift(lift, buildingTopic);
        } else if (floorNumberToGoto > currentLiftFloorNumber) {
            moveLiftUp(lift, currentLiftFloorNumber, floorNumberToGoto, buildingId, buildingTopic);
        } else {
            moveLiftDown(lift, currentLiftFloorNumber, floorNumberToGoto, buildingId, buildingTopic);
        }
    }

    private void handleIdleLift(Lift lift, String buildingTopic) {
        lift.setStatus(LiftStatus.IDLE);
        liftService.saveLift(lift);
        sendLiftUpdate(lift, buildingTopic);
    }

    private void moveLiftUp(Lift lift, int startFloor, int endFloor, UUID buildingId, String buildingTopic) throws InterruptedException {
        lift.setStatus(LiftStatus.MOVING_UP);
        liftService.saveLift(lift);
        sendLiftUpdate(lift, buildingTopic);

        for (int i = startFloor; i <= endFloor; i++) {
            // get fresh lift id, so that it has new data
            lift = getLiftFromDB(lift.getId());
            if (lift.getStatus() == LiftStatus.STAND_BY) {
                lift.setStatus(LiftStatus.MOVING_UP);
                liftService.saveLift(lift);
                sendLiftUpdate(lift, buildingTopic);
            }
            updateLiftFloor(lift, i, buildingId, buildingTopic);
        }
    }

    private void moveLiftDown(Lift lift, int startFloor, int endFloor, UUID buildingId, String buildingTopic) throws InterruptedException {
        lift.setStatus(LiftStatus.MOVING_DOWN);
        liftService.saveLift(lift);
        sendLiftUpdate(lift, buildingTopic);

        for (int i = startFloor; i >= endFloor; i--) {
            // get fresh lift id, so that it has new data
            lift = getLiftFromDB(lift.getId());
            if (lift.getStatus() == LiftStatus.STAND_BY) {
                lift.setStatus(LiftStatus.MOVING_DOWN);
                liftService.saveLift(lift);
                sendLiftUpdate(lift, buildingTopic);
            }
            updateLiftFloor(lift, i, buildingId, buildingTopic);
        }
    }

    private void updateLiftFloor(Lift lift, int floorNumber, UUID buildingId, String buildingTopic) throws InterruptedException {
        Optional<Floor> currentFloorOptional = floorService.getByNumber(buildingId, floorNumber);
        if (currentFloorOptional.isPresent()) {
            Floor currentFloor = currentFloorOptional.get();
            lift.setCurrentFloor(currentFloor);
            if (lift.hasStop(currentFloor)) {
                floorService.getByNumber(buildingId, floorNumber).ifPresent(lift::removeStop);
                if (lift.hasStops()) {
                    lift.setStatus(LiftStatus.STAND_BY);
                } else {
                    lift.setStatus(LiftStatus.IDLE);
                }
            }
            liftService.saveLift(lift);
            log.info("lift : {}, moved to floor number: {}", lift, floorNumber);
            sendLiftUpdate(lift, buildingTopic);
        }
        if (lift.getStatus() == LiftStatus.STAND_BY) {
            // simulate door opening and closing
            Thread.sleep(Duration.ofSeconds(5));
        } else {
            // Simulate the time it takes to move between floors
            Thread.sleep(Duration.ofSeconds(1));
        }
    }

    private void sendLiftUpdate(Lift lift, String buildingTopic) {
        messagingTemplate.convertAndSend(buildingTopic, liftMapper.toDto(lift));
    }
}

