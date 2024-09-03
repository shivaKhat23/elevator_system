package com.elevator.elevatorsystem;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.modulith.core.ApplicationModules;

@SpringBootTest
@Import(TestContainersConfiguration.class)
class ElevatorSystemApplicationTests {


    @Test
    void contextLoads() {
        var modules = ApplicationModules.of(ElevatorSystemApplication.class);
        modules.verify();
    }

}
