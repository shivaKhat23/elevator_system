package com.elevator.elevatorsystem.elevator.service;

import com.elevator.elevatorsystem.elevator.domain.Building;
import com.elevator.elevatorsystem.elevator.repository.BuildingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class BuildingService {

    private final BuildingRepository buildingRepository;

    @Autowired
    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getBuildings() {
        return buildingRepository.findAll();
    }
}
