package com.elevator.elevatorsystem.elevator.service;

import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.event.LiftRequestDirection;
import com.elevator.elevatorsystem.elevator.event.LiftRequestEvent;
import com.elevator.elevatorsystem.elevator.repository.FloorRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@Slf4j
public class FloorService {

    private final FloorRepository floorRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public FloorService(FloorRepository floorRepository, ApplicationEventPublisher applicationEventPublisher) {
        this.floorRepository = floorRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public List<Floor> getFloorsForBuilding(UUID buildingId) {
        return floorRepository.findAllByBuildingIdOrderByNumber(buildingId);
    }

    public Optional<Floor> getFloor(UUID floorId) {
        return floorRepository.findById(floorId);
    }

    public Optional<Floor> getByNumber(UUID buildingId, Integer number) {
        return floorRepository.findByBuildingIdAndNumber(buildingId, number);
    }

    public void performLiftRequest(UUID floorId, LiftRequestDirection liftRequestDirection) {
        getFloor(floorId).ifPresent(floor -> {
            LiftRequestEvent liftRequestEvent = new LiftRequestEvent(floor.getBuilding().getId(), floorId, liftRequestDirection);
            log.info("Lift requested : {}", liftRequestEvent);
            applicationEventPublisher.publishEvent(liftRequestEvent);
        });
    }
}
