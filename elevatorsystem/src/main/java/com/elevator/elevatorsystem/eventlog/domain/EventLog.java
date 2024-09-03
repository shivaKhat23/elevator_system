package com.elevator.elevatorsystem.eventlog.domain;

import com.elevator.elevatorsystem.elevator.domain.Schema;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(schema = Schema.LOG, name = "event_log")
@EqualsAndHashCode
@ToString
public class EventLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private UUID id;

    @Column(name = "building_id", nullable = false)
    @Getter
    @Setter
    private String buildingId;

    @Column(name = "floor_id")
    @Getter
    @Setter
    private String floorId;

    @Column(name = "lift_id")
    @Getter
    @Setter
    private String liftId;

    @Column(nullable = false, name = "event_type")
    @Enumerated(EnumType.STRING)
    @Getter
    @Setter
    private EventType eventType;

    @Column(updatable = false, name = "created_date")
    @Getter
    @Setter
    private Instant createdDate = Instant.now();

    public EventLog() {
    }
}
