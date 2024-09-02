package com.elevator.elevatorsystem.eventlog.controller.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EventsLogDto {
    private List<EventLogDto> content = new ArrayList<EventLogDto>();

    public EventsLogDto(List<EventLogDto> content) {
        this.content = content;
    }
}
