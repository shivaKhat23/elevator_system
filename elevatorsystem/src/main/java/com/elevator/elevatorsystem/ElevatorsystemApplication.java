package com.elevator.elevatorsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class ElevatorsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElevatorsystemApplication.class, args);
    }

}
