package com.elevator.elevatorsystem.elevator.event;

import java.util.UUID;

public record LiftRequestEvent(UUID buildingId, UUID floorId, LiftRequestDirection direction) {
}
