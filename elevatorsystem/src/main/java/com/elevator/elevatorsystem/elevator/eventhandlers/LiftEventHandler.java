package com.elevator.elevatorsystem.elevator.eventhandlers;

import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestEvent;
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

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@Slf4j
public class LiftEventHandler {

    private final String topic = "/topic/%s/lift";
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
    void handleLiftRequest(LiftRequestEvent liftRequestEvent) throws InterruptedException {
        log.info("Handling lift request: {}", liftRequestEvent);

        // Fetch the requested floor
        Optional<Floor> floorOptional = floorService.getFloor(liftRequestEvent.floorId());
        if (floorOptional.isEmpty()) {
            log.info("Floor with id {} not found", liftRequestEvent.floorId());
            return;
        }

        Floor floor = floorOptional.get();
        UUID buildingId = floor.getBuilding().getId();
        List<Lift> lifts = liftService.getLiftsForBuilding(buildingId);

        // Find an available lift
        Optional<Lift> liftOptional = lifts.stream().findAny();
        if (liftOptional.isEmpty()) {
            log.warn("No lift available for building {}", buildingId);
            return;
        }

        Lift lift = liftOptional.get();
        processLiftMovement(lift, floor, buildingId);
    }

    private void processLiftMovement(Lift lift, Floor floor, UUID buildingId) throws InterruptedException {
        Integer floorNumberToGoto = floor.getNumber();
        Integer currentLiftFloorNumber = lift.getCurrentFloor().getNumber();
        String buildingTopic = String.format(topic, buildingId);

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
            updateLiftFloor(lift, i, buildingId, buildingTopic);
        }
    }

    private void moveLiftDown(Lift lift, int startFloor, int endFloor, UUID buildingId, String buildingTopic) throws InterruptedException {
        lift.setStatus(LiftStatus.MOVING_DOWN);
        liftService.saveLift(lift);
        sendLiftUpdate(lift, buildingTopic);

        for (int i = startFloor; i >= endFloor; i--) {
            updateLiftFloor(lift, i, buildingId, buildingTopic);
        }
    }

    private void updateLiftFloor(Lift lift, int floorNumber, UUID buildingId, String buildingTopic) throws InterruptedException {
        Optional<Floor> currentFloor = floorService.getByNumber(buildingId, floorNumber);
        if (currentFloor.isPresent()) {
            lift.setCurrentFloor(currentFloor.get());
            if (floorNumber == lift.getCurrentFloor().getNumber()) {
                lift.setStatus(LiftStatus.IDLE);
            }
            liftService.saveLift(lift);
            log.info("Updating lift: {}, at floor: {}", lift, lift.getCurrentFloor());
            sendLiftUpdate(lift, buildingTopic);
        }
        // Simulate the time it takes to move between floors
        Thread.sleep(1000);
    }

    private void sendLiftUpdate(Lift lift, String buildingTopic) {
        messagingTemplate.convertAndSend(buildingTopic, liftMapper.toDto(lift));
    }
}

