package com.elevator.elevatorsystem.elevator.facade;

import com.elevator.elevatorsystem.common.dto.ListDto;
import com.elevator.elevatorsystem.elevator.controller.dto.LiftDto;
import com.elevator.elevatorsystem.elevator.controller.mapper.LiftMapper;
import com.elevator.elevatorsystem.elevator.service.LiftService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class LiftFacade {

    private final LiftService liftService;
    private final LiftMapper liftMapper;

    @Autowired
    public LiftFacade(LiftService liftService, LiftMapper liftMapper) {
        this.liftService = liftService;
        this.liftMapper = liftMapper;
    }

    public ListDto<LiftDto> getLifts(UUID buildingId) {
        return new ListDto<>(
                liftMapper.toDto(liftService.getLiftsForBuilding(buildingId))
        );
    }

    public void addLiftStop(UUID liftId, UUID floorStopId) {
        liftService.addLiftStop(liftId, floorStopId);
    }

}
