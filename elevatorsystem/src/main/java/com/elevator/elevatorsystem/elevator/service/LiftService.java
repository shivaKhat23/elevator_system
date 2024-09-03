package com.elevator.elevatorsystem.elevator.service;


import com.elevator.elevatorsystem.elevator.domain.Lift;
import com.elevator.elevatorsystem.elevator.event.LiftStopAddEvent;
import com.elevator.elevatorsystem.elevator.repository.LiftRepository;
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
public class LiftService {
    private final LiftRepository liftRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public LiftService(LiftRepository liftRepository, ApplicationEventPublisher eventPublisher) {
        this.liftRepository = liftRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public List<Lift> getLiftsForBuilding(UUID buildingId) {
        return liftRepository.findAllByBuildingId(buildingId);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public Lift saveLift(Lift lift) {
        return liftRepository.save(lift);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public Optional<Lift> getLiftById(UUID id) {
        return liftRepository.findById(id);
    }

    public void addLiftStop(UUID liftId, UUID floorStopId) {
        log.info("add stop: {} for lift {}", floorStopId, liftId);
        getLiftById(liftId).ifPresent(lift -> {
            eventPublisher.publishEvent(new LiftStopAddEvent(lift.getBuilding().getId(), liftId, floorStopId));
        });
    }
}
