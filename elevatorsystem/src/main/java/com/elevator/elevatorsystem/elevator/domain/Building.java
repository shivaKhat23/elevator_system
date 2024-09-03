package com.elevator.elevatorsystem.elevator.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Entity
@Table(schema = Schema.ELEVATOR, name = "building")
@EqualsAndHashCode
@ToString
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    @Setter
    private String name;


    public Building() {
    }

    public Building(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

}
