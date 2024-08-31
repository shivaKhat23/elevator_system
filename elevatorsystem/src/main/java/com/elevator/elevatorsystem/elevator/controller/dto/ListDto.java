package com.elevator.elevatorsystem.elevator.controller.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListDto<DTO> {

    private List<DTO> content = new ArrayList<DTO>();

    public ListDto(List<DTO> content) {
        this.content = content;
    }
}
