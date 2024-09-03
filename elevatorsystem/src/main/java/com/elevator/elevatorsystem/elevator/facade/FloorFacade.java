package com.elevator.elevatorsystem.elevator.facade;

import com.elevator.elevatorsystem.common.dto.ListDto;
import com.elevator.elevatorsystem.elevator.controller.dto.FloorDto;
import com.elevator.elevatorsystem.elevator.controller.dto.LiftRequestedDto;
import com.elevator.elevatorsystem.elevator.controller.mapper.FloorMapper;
import com.elevator.elevatorsystem.elevator.event.LiftRequestDirection;
import com.elevator.elevatorsystem.elevator.service.FloorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class FloorFacade {

    private final FloorService floorService;
    private final FloorMapper floorMapper;

    @Autowired
    public FloorFacade(FloorService floorService, FloorMapper floorMapper) {
        this.floorService = floorService;
        this.floorMapper = floorMapper;
    }

    public ListDto<FloorDto> getFloors(UUID buildingId) {
        return new ListDto<>(
                floorMapper.toDto(floorService.getFloorsForBuilding(buildingId))
        );
    }

    public void performLiftRequest(UUID floorId, LiftRequestedDto liftRequestedDto) {
        var liftRequestDirection = LiftRequestDirection.valueOf(liftRequestedDto.getDirection());
        floorService.performLiftRequest(floorId, liftRequestDirection);
    }
}
