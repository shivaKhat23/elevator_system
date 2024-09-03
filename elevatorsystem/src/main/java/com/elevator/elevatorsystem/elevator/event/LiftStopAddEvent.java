package com.elevator.elevatorsystem.elevator.event;

import java.util.UUID;

public record LiftStopAddEvent(UUID buildingId, UUID liftId, UUID floorId) {
}
