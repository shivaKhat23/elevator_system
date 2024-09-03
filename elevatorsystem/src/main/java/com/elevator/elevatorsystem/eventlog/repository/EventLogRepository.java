package com.elevator.elevatorsystem.eventlog.repository;

import com.elevator.elevatorsystem.eventlog.domain.EventLog;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventLogRepository extends ListCrudRepository<EventLog, UUID> {

    List<EventLog> findAllByBuildingIdOrderByCreatedDateDesc(String buildingId);
}
