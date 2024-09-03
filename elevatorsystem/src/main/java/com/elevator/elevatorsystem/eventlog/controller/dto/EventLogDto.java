package com.elevator.elevatorsystem.eventlog.controller.dto;

import lombok.Data;

@Data
public class EventLogDto {
    String id;
    String buildingId;
    String floorId;
    String liftId;
    String eventType;
    String createdDate;
}
