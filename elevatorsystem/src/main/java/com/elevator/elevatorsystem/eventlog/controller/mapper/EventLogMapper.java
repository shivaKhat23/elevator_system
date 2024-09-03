package com.elevator.elevatorsystem.eventlog.controller.mapper;

import com.elevator.elevatorsystem.eventlog.controller.dto.EventLogDto;
import com.elevator.elevatorsystem.eventlog.domain.EventLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface EventLogMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "buildingId", source = "buildingId")
    @Mapping(target = "liftId", source = "liftId")
    @Mapping(target = "floorId", source = "floorId")
    @Mapping(target = "eventType", source = "eventType")
    @Mapping(target = "createdDate", source = "createdDate")
    EventLogDto toDto(EventLog eventLog);

    List<EventLogDto> toDto(List<EventLog> eventLogs);
}
