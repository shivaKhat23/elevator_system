package com.elevator.elevatorsystem.elevator.controller.event;

import java.util.UUID;

public record LiftStopAddEvent(UUID liftId, UUID floorId) {
}
