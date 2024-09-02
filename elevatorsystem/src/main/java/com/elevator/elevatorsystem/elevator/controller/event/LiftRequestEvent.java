package com.elevator.elevatorsystem.elevator.controller.event;

import java.util.UUID;

public record LiftRequestEvent(UUID buildingId, UUID floorId, LiftRequestDirection direction) {
}
