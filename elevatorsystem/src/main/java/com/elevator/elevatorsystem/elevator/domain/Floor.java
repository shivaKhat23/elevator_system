package com.elevator.elevatorsystem.elevator.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
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
    private UUID id;

    @Column(nullable = false, unique = true)
    @Setter
    private Integer number;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "building_id")
    private Building building;

    public Floor() {
    }

    public Floor(UUID id, Integer number) {
        this.id = id;
        this.number = number;
    }
}
