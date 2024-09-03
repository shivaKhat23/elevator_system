package com.elevator.elevatorsystem.eventlog.facade;

import com.elevator.elevatorsystem.common.dto.ListDto;
import com.elevator.elevatorsystem.eventlog.controller.dto.EventLogDto;
import com.elevator.elevatorsystem.eventlog.controller.mapper.EventLogMapper;
import com.elevator.elevatorsystem.eventlog.service.EventLogService;
import org.springframework.stereotype.Component;

@Component
public class EventLogFacade {
    private final EventLogMapper eventLogMapper;
    private final EventLogService eventLogService;

    public EventLogFacade(EventLogMapper eventLogMapper, EventLogService eventLogService) {
        this.eventLogMapper = eventLogMapper;
        this.eventLogService = eventLogService;
    }

    public ListDto<EventLogDto> getEventLogs(String buildingId) {
        return new ListDto<>(
                eventLogMapper.toDto(eventLogService.findAll(buildingId))
        );
    }
}
