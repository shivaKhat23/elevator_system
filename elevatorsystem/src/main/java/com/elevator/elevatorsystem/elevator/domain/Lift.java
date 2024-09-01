package com.elevator.elevatorsystem.elevator.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(schema = Schema.ELEVATOR, name = "lift")
@Data
@EqualsAndHashCode(exclude = {"currentFloor", "floorStops", "building"})
@ToString(exclude = {"currentFloor", "floorStops", "building"})
public class Lift {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "floor_id")
    private Floor currentFloor;

    @Enumerated(EnumType.STRING)
    private LiftStatus status = LiftStatus.IDLE;

    @Column(nullable = false)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "lift_to_floor_stops",
            schema = Schema.ELEVATOR,
            joinColumns = @JoinColumn(name = "lift_id"),
            inverseJoinColumns = @JoinColumn(name = "floor_id")
    )
    private List<Floor> floorStops = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "building_id")
    private Building building;

    public boolean addStop(Floor stop) {
        if (!floorStops.contains(stop) && !stop.equals(currentFloor)) {
            floorStops.add(stop);
            return true;
        }
        return false;
    }

    public void removeStop(Floor stop) {
        getFloorStops().remove(stop);
    }

    public boolean hasStops() {
        return !getFloorStops().isEmpty();
    }

    public boolean hasStop(Floor stop) {
        return getFloorStops().contains(stop);
    }


}
