package com.elevator.elevatorsystem.eventlog.controller;

import com.elevator.elevatorsystem.eventlog.controller.dto.EventsLogDto;
import com.elevator.elevatorsystem.eventlog.facade.EventLogFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buildings/{buildingId}/event-logs")
public class EventLogController {
    private final EventLogFacade eventLogFacade;

    public EventLogController(EventLogFacade eventLogFacade) {
        this.eventLogFacade = eventLogFacade;
    }

    @GetMapping
    private ResponseEntity<EventsLogDto> getEventLogs(@PathVariable String buildingId) {
        return ResponseEntity.ok(eventLogFacade.getEventLogs(buildingId));
    }
}
