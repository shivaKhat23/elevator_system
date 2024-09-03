# Elevator System

![Elevator System](./media/elevator_system.webp)

### Technologies used

#### Frontend

- [React](https://react.dev/)
- TypeScript
- [Redux Toolkit](https://redux-toolkit.js.org/) is used for state management
- [MUI](https://mui.com/material-ui/getting-started/) is as component library
- React Router
- [React Stomp hooks](https://github.com/SvenKirschbaum/react-stomp-hooks) is used to manage Websockets connection.

#### Backend

- Spring Boot 3
- Spring Data JPA
- [Spring Modulith](https://docs.spring.io/spring-modulith/reference/)
- [STOMP Over WebSocket](https://jmesnil.net/stomp-websocket/doc/)
  - [Article on this topic](https://hpcodes.medium.com/send-messages-from-spring-boot-backend-to-reactjs-app-using-websocket-4120f6979c9b)
- PostgreSQL
- Flyway, MapStruct, Lombok, TestContainers, Junit and more

#### Authentication and Authorization (Work in progress)

- [AWS Cognito](https://aws.amazon.com/cognito/)
- Spring Security

#### Infrastructure

- AWS CDK

### Elevator Database Schema

![DB schema](./media/elevator_db_schema.png)

### General Working

#### Features

- **Up/Down Buttons:** Users can request the elevator by pressing up or down buttons on each floor.
- **Inside Control Panel:** Allows passengers to select their destination floor.
- **Floor Request Handling:**
  - Keeps track of all floor requests and processes them in an optimized order.
  - Determines the best order for servicing requests.
  - Prioritize requests based on direction, current elevator location, and other factors.
- **Admin view**
  - Allows Admin to view all required info at 1 place
  - Event logs
  - Floor stops

#### Video

##### Example with 1 Lift
[![System with 1 Lift](https://github.com/shivaKhat23/elevator_system/blob/main/media/one_lift.mp4)](https://github.com/shivaKhat23/elevator_system/blob/main/media/one_lift.mp4)

##### Example with 2 Lift
[![System with 2 lift](https://github.com/shivaKhat23/elevator_system/blob/main/media/two_lift.mp4)](https://github.com/shivaKhat23/elevator_system/blob/main/media/two_lift.mp4)
