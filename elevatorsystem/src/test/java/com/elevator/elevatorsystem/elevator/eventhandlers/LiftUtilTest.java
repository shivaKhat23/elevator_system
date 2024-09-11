package com.elevator.elevatorsystem.elevator.eventhandlers;

import com.elevator.elevatorsystem.elevator.domain.Floor;
import com.elevator.elevatorsystem.elevator.domain.Lift;
import com.elevator.elevatorsystem.elevator.domain.LiftStatus;
import com.elevator.elevatorsystem.elevator.event.LiftRequestDirection;
import lombok.extern.slf4j.Slf4j;
import org.junit.Ignore;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
class LiftUtilTest {
    private List<Floor> floorList;
    private Lift lift1;
    private Lift lift2;
    private Lift lift3;
    private Lift lift4;
    private List<Lift> lifts;

    @BeforeEach
    public void setUp() {
        floorList = new ArrayList<Floor>();
        for (int i = 1; i <= 100; i++) {
            floorList.add(new Floor(UUID.randomUUID(), i));
        }

        lift1 = new Lift();
        lift1.setName("Lift1");
        lift1.setCurrentFloor(floorList.getFirst());
        lift1.setStatus(LiftStatus.IDLE);

        // 60 -> 1
        lift2 = new Lift();
        lift2.setName("Lift2");
        lift2.setCurrentFloor(floorList.get(59));
        lift2.setStatus(LiftStatus.MOVING_DOWN);
        lift2.addStop(floorList.getFirst());

        // 54 -> 100
        lift3 = new Lift();
        lift3.setName("Lift3");
        lift3.setCurrentFloor(floorList.get(53));
        lift3.setStatus(LiftStatus.MOVING_UP);
        lift3.addStop(floorList.getLast());

        lift4 = new Lift();
        lift4.setName("Lift4");
        lift4.setCurrentFloor(floorList.getLast());
        lift4.setStatus(LiftStatus.IDLE);

        lifts = List.of(lift1, lift2, lift3, lift4);

    }

    @Test
    void findOptimalLift_case1() {
        // floor 55, going down
        Floor requestFromFloor = floorList.get(54);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.DOWN;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        Assertions.assertEquals(lift2, selectedLift);
    }

    @Test
    void findOptimalLift_case2() {
        // floor 25 , going down
        Floor requestFromFloor = floorList.get(24);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.DOWN;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift1, selectedLift);
    }

    @Test
    void findOptimalLift_case3() {
        List<Lift> lifts = List.of(lift1, lift2, lift3, lift4);
        // floor 25, going up
        Floor requestFromFloor = floorList.get(24);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift1, selectedLift);
    }

    @Test
    void findOptimalLift_case4() {
        // floor 55, going up
        Floor requestFromFloor = floorList.get(54);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift3, selectedLift);
    }

    @Test
    void findOptimalLift_case5() {

        // 50 -> 60
        lift2.setCurrentFloor(floorList.get(49));
        lift2.getFloorStops().clear();
        lift2.addStop(floorList.get(59));

        // 60 -> 50
        lift3.setCurrentFloor(floorList.get(59));
        lift3.getFloorStops().clear();
        lift3.addStop(floorList.get(49));

        // floor 55, going up
        Floor requestFromFloor = floorList.get(54);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        log.info("selected lift: {}", selectedLift);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift2, selectedLift);
    }

    @Test
    void findOptimalLift_case6() {

        // 50 -> 60
        lift2.setCurrentFloor(floorList.get(49));
        lift2.getFloorStops().clear();
        lift2.addStop(floorList.get(59));

        // 60 -> 54
        lift3.setCurrentFloor(floorList.get(59));
        lift3.getFloorStops().clear();
        lift3.addStop(floorList.get(53));

        // floor 55, going up
        Floor requestFromFloor = floorList.get(54);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        log.info("selected lift: {}", selectedLift);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift3, selectedLift);
    }

    @Test
    void findOptimalLift_case7() {

        // 1 -> 100
        lift2.setCurrentFloor(floorList.getFirst());
        lift2.getFloorStops().clear();
        lift2.addStop(floorList.getLast());

        // 60 -> 54
        lift3.setCurrentFloor(floorList.get(59));
        lift3.getFloorStops().clear();
        lift3.addStop(floorList.get(53));

        // floor 55, going up
        Floor requestFromFloor = floorList.get(54);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        log.info("selected lift: {}", selectedLift);

        // lift 1 is the nearest and idle
        Assertions.assertEquals(lift3, selectedLift);
    }

    @Test
    @Ignore
    void findOptimalLift_case8() {

        // 1st floor idle
        lift1 = new Lift();
        lift1.setName("Lift1");
        lift1.setCurrentFloor(floorList.getFirst());
        lift1.setStatus(LiftStatus.IDLE);

        // 5th floor -> 50th floor
        // but, will go down
        lift2 = new Lift();
        lift2.setName("Lift2");
        lift2.setCurrentFloor(floorList.get(4));
        lift2.setStatus(LiftStatus.MOVING_UP);
        lift2.addStop(floorList.get(49));

        // 1st floor idle
        lift3 = new Lift();
        lift3.setName("Lift3");
        lift3.setCurrentFloor(floorList.getFirst());
        lift3.setStatus(LiftStatus.IDLE);

        // 1st floor idle
        lift4 = new Lift();
        lift4.setName("Lift4");
        lift4.setCurrentFloor(floorList.getFirst());
        lift4.setStatus(LiftStatus.IDLE);

        lifts = List.of(lift1, lift2, lift3, lift4);

        // floor 60, going up
        Floor requestFromFloor = floorList.get(59);
        LiftRequestDirection liftRequestDirection = LiftRequestDirection.UP;
        Lift selectedLift = LiftUtil.findOptimalLift(lifts, requestFromFloor, liftRequestDirection);

        log.info("selected lift: {}", selectedLift);

        // lift 1 is the nearest and idle
        Assertions.assertNotEquals(lift2, selectedLift);
    }

    @Test
    public void test (){
        int a = 1;
        if(a = 10){
            System.out.println(a);
        }
    }

}