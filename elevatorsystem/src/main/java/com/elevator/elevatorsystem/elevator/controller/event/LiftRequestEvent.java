package com.elevator.elevatorsystem.elevator.controller.event;

import java.util.UUID;

public record LiftRequestEvent(UUID floorId, LiftRequestDirection direction) {
}
