package com.elevator.elevatorsystem.elevator.controller.mapper;

import com.elevator.elevatorsystem.elevator.controller.dto.FloorDto;
import com.elevator.elevatorsystem.elevator.domain.Floor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface FloorMapper {

    @Mapping(target = "buildingId", source = "building.id")
    FloorDto toDto(Floor floor);

    List<FloorDto> toDto(List<Floor> floors);
}
