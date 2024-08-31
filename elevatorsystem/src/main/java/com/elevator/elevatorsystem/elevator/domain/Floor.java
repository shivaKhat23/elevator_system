package com.elevator.elevatorsystem.elevator.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Table(
        schema = Schema.ELEVATOR,
        name = "floor",
        uniqueConstraints = @UniqueConstraint(columnNames = {"number", "building_id"})
)
@EqualsAndHashCode
@ToString
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private UUID id;

    @Column(nullable = false, unique = true)
    @Getter
    @Setter
    private Integer number;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "building_id")
    @Getter
    private Building building;

    public Floor() {
    }

    public Floor(UUID id, Integer number) {
        this.id = id;
        this.number = number;
    }
}
