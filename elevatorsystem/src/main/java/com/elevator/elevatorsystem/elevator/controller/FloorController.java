package com.elevator.elevatorsystem.elevator.controller;

import com.elevator.elevatorsystem.elevator.controller.dto.FloorDto;
import com.elevator.elevatorsystem.common.dto.ListDto;
import com.elevator.elevatorsystem.elevator.facade.FloorFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/buildings/{buildingId}/floors")
public class FloorController {
    private final FloorFacade floorFacade;

    @Autowired
    public FloorController(FloorFacade floorFacade) {
        this.floorFacade = floorFacade;
    }

    @GetMapping
    public ResponseEntity<ListDto<FloorDto>> getFloors(@PathVariable String buildingId) {
        return ResponseEntity.ok(floorFacade.getFloors(UUID.fromString(buildingId)));
    }
}
