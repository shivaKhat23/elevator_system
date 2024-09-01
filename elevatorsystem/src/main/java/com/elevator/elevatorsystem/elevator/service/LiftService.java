package com.elevator.elevatorsystem.elevator.service;


import com.elevator.elevatorsystem.elevator.domain.Lift;
import com.elevator.elevatorsystem.elevator.repository.LiftRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class LiftService {
    private final LiftRepository liftRepository;

    @Autowired
    public LiftService(LiftRepository liftRepository) {
        this.liftRepository = liftRepository;
    }

    public List<Lift> getLiftsForBuilding(UUID buildingId) {
        return liftRepository.findAllByBuildingId(buildingId);
    }

    public Lift saveLift(Lift lift) {
        return liftRepository.save(lift);
    }
}
