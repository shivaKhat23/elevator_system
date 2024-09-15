import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  ElevatorHome: undefined;
  Admin: undefined;
};

export type ElevatorHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'ElevatorHome'>;
export type ElevatorHomeScreenNavigationProps = ElevatorHomeScreenProps['navigation'];
export type ElevatorHomeScreenRouteProps = ElevatorHomeScreenProps['route'];

export type AdminScreenProps = NativeStackScreenProps<RootStackParamList, 'Admin'>;
export type AdminScreenNavigationProps = AdminScreenProps['navigation'];
export type AdminScreenRouteProps = AdminScreenProps['route'];

export type ElevatorStackParamList = {
  Building: undefined;
  Floor: { buildingId: string; buildingName: string };
  Elevator: { buildingId: string; buildingName: string; floorId: string; floorNumber: number };
};

export type BuildingScreenProps = NativeStackScreenProps<ElevatorStackParamList, 'Building'>;
export type BuildingScreenNavigationProps = BuildingScreenProps['navigation'];

export type FloorScreenprops = NativeStackScreenProps<ElevatorStackParamList, 'Floor'>;
export type FloorScreenNavigationProps = FloorScreenprops['navigation'];
export type FloorScreenRouteProps = FloorScreenprops['route'];

export type ElevatorScreenProps = NativeStackScreenProps<ElevatorStackParamList, 'Elevator'>;
export type ElevatorScreenNavigationProps = ElevatorScreenProps['navigation'];
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
