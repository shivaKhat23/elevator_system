package com.elevator.elevatorsystem.elevator.controller;

import com.elevator.elevatorsystem.elevator.controller.dto.BuildingDto;
import com.elevator.elevatorsystem.elevator.controller.dto.ListDto;
import com.elevator.elevatorsystem.elevator.facade.BuildingFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingFacade buildingFacade;

    @Autowired
    public BuildingController(BuildingFacade buildingFacade) {
        this.buildingFacade = buildingFacade;
    }

    @GetMapping
    public ResponseEntity<ListDto<BuildingDto>> getBuildings() {
        return ResponseEntity.ok(buildingFacade.getBuildings());
    }
}
