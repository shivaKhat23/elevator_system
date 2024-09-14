import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Elevator: undefined;
};

export type ElevatorScreenProps = NativeStackScreenProps<RootStackParamList, 'Elevator'>;
export type ElevatorScreenNavigationProp = ElevatorScreenProps['navigation'];
export type ElevatorScreenRouteProps = ElevatorScreenProps['route'];

// API types

export type ListResponse<T> = {
  content: T[];
};

export type Building = {
  id: string;
  name: string;
};

export type Floor = {
  id: string;
  number: number;
  buildingId: string;
};

export enum LiftStatus {
  MOVING_UP = 'MOVING_UP',
  MOVING_DOWN = 'MOVING_DOWN',
  IDLE = 'IDLE',
  STAND_BY = 'STAND_BY',
}

export type Lift = {
  id: string;
  name: string;
  status: LiftStatus;
  currentFloorNumber: number;
  currentFloorId: string;
  floorStops: number[];
  buildingId: string;
};

export enum LiftRequestDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum EventType {
  FLOOR_REQUEST = 'FLOOR_REQUEST',
  FLOOR_STOP_ADD = 'FLOOR_STOP_ADD',
}

export type EventLog = {
  id: string;
  floorId: string;
  liftId: string;
  eventType: string;
  createdDate: string;
};

// possible redux states
export type LoadingState = {
  status: 'loading';
};

export type ErrorState = {
  status: 'error';
  error: string;
};

export type SuccessState<T> = {
  status: 'success';
  data: T;
};

export type IdleState = {
  status: 'idle';
  error: null;
  data: null;
};

export type ReduxState<T> = IdleState | LoadingState | ErrorState | SuccessState<T>;

export function isSuccessState<T>(state: ReduxState<T>): state is SuccessState<T> {
  return state.status === 'success';
}
