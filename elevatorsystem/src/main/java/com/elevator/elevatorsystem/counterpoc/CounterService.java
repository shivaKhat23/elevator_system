package com.elevator.elevatorsystem.counterpoc;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Slf4j
class CounterService {

    private AtomicBoolean counterStarted = new AtomicBoolean(false);
    @Getter
    private AtomicInteger counter = new AtomicInteger(0);
    private final SimpMessagingTemplate messagingTemplate;

    CounterService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public Integer getCounterValue() {
        return counter.intValue();
    }

    @Async
    @EventListener
    public void beginCounting(CounterEvent counterEvent) throws InterruptedException {
        log.info("Counter started at {}", counterEvent.dateTime());
        if (!counterStarted.get()) {
            counterStarted.set(true);
            if (counter.get() == 100) {
                counter.set(0);
            }
            for (Integer currentValue = counter.get(); currentValue <= 100; currentValue++) {
                counter.set(currentValue);
                log.info("Counter value:  {}", currentValue);
                messagingTemplate.convertAndSend("/topic/counter", new CounterDto(counter.get()));
                if (currentValue == 100) {
                    counterStarted.set(false);
                    break;
                }
                Thread.sleep(1000);
            }
        }
    }
}
