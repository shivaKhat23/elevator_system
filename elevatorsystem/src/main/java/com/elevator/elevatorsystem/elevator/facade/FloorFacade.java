package com.elevator.elevatorsystem.elevator.facade;

import com.elevator.elevatorsystem.elevator.controller.dto.FloorDto;
import com.elevator.elevatorsystem.elevator.controller.dto.LiftRequestedDto;
import com.elevator.elevatorsystem.elevator.controller.dto.ListDto;
import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestDirection;
import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestEvent;
import com.elevator.elevatorsystem.elevator.controller.mapper.FloorMapper;
import com.elevator.elevatorsystem.elevator.service.FloorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class FloorFacade {

    private final FloorService floorService;
    private final FloorMapper floorMapper;
    private final ApplicationEventPublisher publisher;

    @Autowired
    public FloorFacade(FloorService floorService, FloorMapper floorMapper, ApplicationEventPublisher publisher) {
        this.floorService = floorService;
        this.floorMapper = floorMapper;
        this.publisher = publisher;
    }

    public ListDto<FloorDto> getFloors(UUID buildingId) {
        return new ListDto<>(
                floorMapper.toDto(floorService.getFloorsForBuilding(buildingId))
        );
    }

    public void performListRequest(UUID floorId, LiftRequestedDto liftRequestedDto) {
        var liftRequestDirection = LiftRequestDirection.valueOf(liftRequestedDto.getDirection());
        LiftRequestEvent liftRequestEvent = new LiftRequestEvent(floorId, liftRequestDirection);
        log.info("Lift requested : {}", liftRequestEvent);
        publisher.publishEvent(liftRequestEvent);
    }
}
