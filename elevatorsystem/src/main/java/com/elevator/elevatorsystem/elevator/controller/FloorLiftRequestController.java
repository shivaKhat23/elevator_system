package com.elevator.elevatorsystem.elevator.controller;

import com.elevator.elevatorsystem.elevator.controller.dto.LiftRequestedDto;
import com.elevator.elevatorsystem.elevator.facade.FloorFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/floors/{floorId}/lift-request")
public class FloorLiftRequestController {

    private final FloorFacade floorFacade;

    @Autowired
    public FloorLiftRequestController(FloorFacade floorFacade) {
        this.floorFacade = floorFacade;
    }

    @PostMapping
    public ResponseEntity<Void> performLiftRequest(@PathVariable String floorId, @RequestBody LiftRequestedDto liftRequestedDto) {
        floorFacade.performLiftRequest(UUID.fromString(floorId), liftRequestedDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
