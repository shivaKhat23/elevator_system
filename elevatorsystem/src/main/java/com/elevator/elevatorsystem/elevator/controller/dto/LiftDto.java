package com.elevator.elevatorsystem.elevator.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class LiftDto {
    private String id;
    private String name;
    private String status;
    private Integer currentFloorNumber;
    private String currentFloorId;
    private List<Integer> floorStops;
    private String buildingId;

}
