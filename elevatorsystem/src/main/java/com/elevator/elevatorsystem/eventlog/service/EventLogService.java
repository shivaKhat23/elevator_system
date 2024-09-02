package com.elevator.elevatorsystem.eventlog.service;

import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestEvent;
import com.elevator.elevatorsystem.elevator.controller.event.LiftStopAddEvent;
import com.elevator.elevatorsystem.eventlog.controller.mapper.EventLogMapper;
import com.elevator.elevatorsystem.eventlog.domain.EventLog;
import com.elevator.elevatorsystem.eventlog.domain.EventType;
import com.elevator.elevatorsystem.eventlog.repository.EventLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class EventLogService {
    private final String TOPIC = "/topic/%s/event-log";
    private final EventLogRepository eventLogRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final EventLogMapper eventLogMapper;

    @Autowired
    public EventLogService(EventLogRepository eventLogRepository, SimpMessagingTemplate messagingTemplate, EventLogMapper eventLogMapper) {
        this.eventLogRepository = eventLogRepository;
        this.messagingTemplate = messagingTemplate;
        this.eventLogMapper = eventLogMapper;
    }

    public List<EventLog> findAll(String buildingId) {
        return eventLogRepository.findAllByBuildingIdOrderByCreatedDateDesc(buildingId);
    }

    @Async
    @EventListener
    public void handleLiftRequest(LiftRequestEvent event) {
        EventLog eventLog = new EventLog();
        eventLog.setBuildingId(event.buildingId().toString());
        eventLog.setEventType(EventType.FLOOR_REQUEST);
        eventLog.setFloorId(event.floorId().toString());
        eventLogRepository.save(eventLog);
        pushEventLogUpdate(eventLog);
    }

    @Async
    @EventListener
    public void handleStopAddEvent(LiftStopAddEvent event) {
        EventLog eventLog = new EventLog();
        eventLog.setEventType(EventType.FLOOR_STOP_ADD);
        eventLog.setBuildingId(event.buildingId().toString());
        eventLog.setFloorId(event.floorId().toString());
        eventLog.setLiftId(event.liftId().toString());
        eventLogRepository.save(eventLog);
        pushEventLogUpdate(eventLog);
    }

    private void pushEventLogUpdate(EventLog eventLog) {
        messagingTemplate.convertAndSend(String.format(TOPIC, eventLog.getBuildingId()), eventLogMapper.toDto(eventLog));
    }
}
