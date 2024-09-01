package com.elevator.elevatorsystem.elevator.service;

import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.repository.FloorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class FloorService {

    private final FloorRepository floorRepository;

    @Autowired
    public FloorService(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
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
}
