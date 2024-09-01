package com.elevator.elevatorsystem.elevator.controller;

import com.elevator.elevatorsystem.elevator.facade.LiftFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/floors/{floorId}/lifts/{liftId}/add-stop")
public class FloorStopController {

    private final LiftFacade liftFacade;


    public FloorStopController(LiftFacade liftFacade) {
        this.liftFacade = liftFacade;
    }

    @PutMapping
    public ResponseEntity<Void> addStopToLift(@PathVariable String floorId, @PathVariable String liftId) {
        liftFacade.addLiftStop(UUID.fromString(liftId), UUID.fromString(floorId));
        return ResponseEntity.noContent().build();
    }
}
