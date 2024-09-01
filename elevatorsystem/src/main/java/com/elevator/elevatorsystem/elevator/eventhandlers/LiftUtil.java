package com.elevator.elevatorsystem.elevator.eventhandlers;


import com.elevator.elevatorsystem.elevator.controller.event.LiftRequestDirection;
import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.domain.Lift;
import com.elevator.elevatorsystem.elevator.domain.LiftStatus;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LiftUtil {

    public static Lift findOptimalLift(List<Lift> lifts, Floor floor, LiftRequestDirection direction) {
        // if there is only 1 lift, there is no optimal
        if (lifts.size() == 1) {
            return lifts.getFirst();
        }

        Map<Lift, LiftInfo> liftToListInfo = new HashMap<>();
        for (Lift lift : lifts) {
            liftToListInfo.put(lift, getLiftInfo(lift));
        }

        /**
         * If the lift is moving in the same direction or is idle, calculate the difference with the current floor of the lift.
         * If the lift is moving in the opposite direction, calculate the difference with the furthest destination floor of the lift.
         * also, if it is opposite, diff is doubled
         */
        return lifts
                .stream().min(Comparator
                        .comparing((Lift lift) -> {
                            LiftInfo liftInfo = liftToListInfo.get(lift);
                            int valueToCheckWith = lift.getCurrentFloor().getNumber();
                            boolean opposite = false;
                            if ((liftInfo.status == LiftStatus.MOVING_UP && direction == LiftRequestDirection.DOWN)
                                    || (liftInfo.status == LiftStatus.MOVING_DOWN && direction == LiftRequestDirection.UP)) {
                                valueToCheckWith = liftInfo.furthestFloor.getNumber();
                                opposite = true;
                            }

                            int diff = Math.abs(valueToCheckWith - floor.getNumber());
                            // give idle more priority by reducing the diff by 0.5 ?
                            return opposite ? 2 * diff : diff;
                        })).orElse(null);
    }

    public static LiftInfo getLiftInfo(Lift lift) {
        if (!lift.hasStops()) {
            return new LiftInfo(null, LiftStatus.IDLE);
        }
        List<Floor> floorLift = lift.getFloorStops();

        Floor currentFloor = lift.getCurrentFloor();

        Floor maxFloor = floorLift
                .stream()
                .max(Comparator.comparing(floor -> Math.abs(currentFloor.getNumber() - floor.getNumber())))
                .orElse(null);

        if (maxFloor == null) {
            return new LiftInfo(null, LiftStatus.IDLE);
        }

        if (currentFloor.getNumber() > maxFloor.getNumber()) {
            return new LiftInfo(maxFloor, LiftStatus.MOVING_DOWN);
        } else if (currentFloor.getNumber() < maxFloor.getNumber()) {
            return new LiftInfo(maxFloor, LiftStatus.MOVING_UP);
        } else {
            return new LiftInfo(currentFloor, LiftStatus.IDLE);
        }
    }

    public record LiftInfo(Floor furthestFloor, LiftStatus status) {
    }
}
