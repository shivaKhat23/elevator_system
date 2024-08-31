package com.elevator.elevatorsystem.elevator.controller.mapper;

import com.elevator.elevatorsystem.elevator.controller.dto.LiftDto;
import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.domain.Lift;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface LiftMapper {

    @Mapping(target = "currentFloorId", source = "currentFloor.id")
    @Mapping(target = "currentFloorNumber", source = "currentFloor.number")
    @Mapping(target = "buildingId", source = "building.id")
    LiftDto toDto(Lift lift);

    List<LiftDto> toDto(List<Lift> lifts);

    default List<Integer> getFloorNumbers(List<Floor> floors) {
        return floors.stream()
                .map(Floor::getNumber)
                .sorted()
                .toList();
    }
}
