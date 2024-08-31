package com.elevator.elevatorsystem.elevator.facade;

import com.elevator.elevatorsystem.elevator.controller.dto.BuildingDto;
import com.elevator.elevatorsystem.elevator.controller.dto.ListDto;
import com.elevator.elevatorsystem.elevator.controller.mapper.BuildingMapper;
import com.elevator.elevatorsystem.elevator.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BuildingFacade {
    private final BuildingService buildingService;
    private final BuildingMapper buildingMapper;

    @Autowired
    public BuildingFacade(BuildingService buildingService, BuildingMapper buildingMapper) {
        this.buildingService = buildingService;
        this.buildingMapper = buildingMapper;
    }

    public ListDto<BuildingDto> getBuildings() {
        return new ListDto<>(
                buildingMapper.toDto(buildingService.getBuildings())
        );
    }
}
