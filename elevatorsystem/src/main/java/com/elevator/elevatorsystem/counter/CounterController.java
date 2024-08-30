package com.elevator.elevatorsystem.counter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@Slf4j
public class CounterController {
    private final ApplicationEventPublisher publisher;
    private final CounterService counterService;

    CounterController(ApplicationEventPublisher publisher, CounterService counterService) {
        this.publisher = publisher;
        this.counterService = counterService;
    }

    @GetMapping("/api/counter")
    public ResponseEntity<CounterDto> getCurrentCounterValue() {
        CounterDto counterDto = new CounterDto(counterService.getCounterValue());
        return new ResponseEntity<>(counterDto, HttpStatus.OK);
    }


    @PutMapping("/api/counter")
    public void startCounter() {
        LocalDateTime now = LocalDateTime.now();
        log.info("Starting counter now: {}", now);
        this.publisher.publishEvent(new CounterEvent(now));
    }

}
