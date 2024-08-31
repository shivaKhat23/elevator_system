package com.elevator.elevatorsystem.elevator.controller.mapper;

import com.elevator.elevatorsystem.elevator.controller.dto.BuildingDto;
import com.elevator.elevatorsystem.elevator.domain.Building;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface BuildingMapper {
    BuildingDto toDto(Building building);

    List<BuildingDto> toDto(List<Building> buildings);
}
