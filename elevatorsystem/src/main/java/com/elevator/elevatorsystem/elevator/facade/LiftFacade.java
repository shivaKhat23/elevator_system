package com.elevator.elevatorsystem.elevator.facade;

import com.elevator.elevatorsystem.elevator.controller.dto.LiftDto;
import com.elevator.elevatorsystem.elevator.controller.dto.ListDto;
import com.elevator.elevatorsystem.elevator.controller.mapper.LiftMapper;
import com.elevator.elevatorsystem.elevator.controller.event.LiftStopAddEvent;
import com.elevator.elevatorsystem.elevator.service.LiftService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class LiftFacade {

    private final LiftService liftService;
    private final LiftMapper liftMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public LiftFacade(LiftService liftService, LiftMapper liftMapper, ApplicationEventPublisher eventPublisher) {
        this.liftService = liftService;
        this.liftMapper = liftMapper;
        this.eventPublisher = eventPublisher;
    }

    public ListDto<LiftDto> getLifts(UUID buildingId) {
        return new ListDto<>(
                liftMapper.toDto(liftService.getLiftsForBuilding(buildingId))
        );
    }

    public void addLiftStop(UUID liftId, UUID floorStopId) {
        log.info("add stop: {} for lift {}", floorStopId, liftId);
        eventPublisher.publishEvent(new LiftStopAddEvent(liftId, floorStopId));
    }

}
