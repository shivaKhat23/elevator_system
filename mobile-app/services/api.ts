import { Building, Floor, Lift, LiftRequestDirection, ListResponse } from '@/types/types';
import axios from 'axios';

const BASE_URI = 'https://mastiff-definite-coyote.ngrok-free.app/api';

export async function getBuildings(): Promise<Building[]> {
  const response = await axios.get(`${BASE_URI}/buildings`);
  return response.data?.content ?? [];
}

export async function getFloors(buildingId: string): Promise<Floor[]> {
  const response = await axios.get(`${BASE_URI}/buildings/${buildingId}/floors`);
  return response.data?.content ?? [];
}

export async function getLifts(buildingId: string): Promise<Lift[]> {
  const response = await axios.get(`${BASE_URI}/buildings/${buildingId}/lifts`);
  return response.data?.content ?? [];
}

export async function requestLift(floorId: string, direction: LiftRequestDirection) {
  return await axios.post(`${BASE_URI}/floors/${floorId}/lift-request`, { direction: direction });
}
