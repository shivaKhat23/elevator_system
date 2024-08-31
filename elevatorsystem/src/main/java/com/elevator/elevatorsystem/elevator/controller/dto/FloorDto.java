package com.elevator.elevatorsystem.elevator.controller.dto;

import lombok.Data;

@Data
public class FloorDto {
    private String id;
    private Integer number;
    private String buildingId;
}
