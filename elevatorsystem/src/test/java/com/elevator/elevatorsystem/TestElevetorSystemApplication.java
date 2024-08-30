package com.elevator.elevatorsystem;

import org.springframework.boot.SpringApplication;

public class TestElevetorSystemApplication {
    public static void main(String[] args) {
        SpringApplication.from(ElevatorsystemApplication::main).with(TestContainersConfiguration.class).run(args);
    }
}
