package com.elevator.elevatorsystem.eventlog.facade;

import com.elevator.elevatorsystem.eventlog.controller.dto.EventsLogDto;
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

    public EventsLogDto getEventLogs(String buildingId) {
        return new EventsLogDto(
                eventLogMapper.toDto(eventLogService.findAll(buildingId))
        );
    }
}
