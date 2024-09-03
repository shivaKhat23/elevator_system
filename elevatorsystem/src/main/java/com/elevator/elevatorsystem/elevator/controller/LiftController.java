package com.elevator.elevatorsystem.elevator.controller;

import com.elevator.elevatorsystem.elevator.controller.dto.LiftDto;
import com.elevator.elevatorsystem.common.dto.ListDto;
import com.elevator.elevatorsystem.elevator.facade.LiftFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/buildings/{buildingId}/lifts")
public class LiftController {

    private final LiftFacade liftFacade;

    @Autowired
    public LiftController(LiftFacade liftFacade) {
        this.liftFacade = liftFacade;
    }

    @GetMapping
    public ResponseEntity<ListDto<LiftDto>> getLifts(@PathVariable String buildingId) {
        return ResponseEntity.ok(liftFacade.getLifts(UUID.fromString(buildingId)));
    }
}
