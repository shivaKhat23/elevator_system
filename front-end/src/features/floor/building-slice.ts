import { apiSlice } from '@/config/redux/api-slice';
import { Building, Floor, LiftRequestDirection, ListResponse } from '@/types/types';

export type LiftRequest = {
  floorId: string;
  direction: LiftRequestDirection;
};

export type LiftFloorStop = {
  floorId: string;
  liftId: string;
};

export const buildingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuildings: builder.query<ListResponse<Building>, void>({
      query: () => ({ url: 'buildings' }),
    }),
    getFloors: builder.query<ListResponse<Floor>, string>({
      query: (buildingId) => ({ url: `buildings/${buildingId}/floors` }),
    }),
    requestLift: builder.mutation<void, LiftRequest>({
      query: ({ floorId, direction }) => ({
        url: `/floors/${floorId}/lift-request`,
        method: 'POST',
        body: { direction: direction },
      }),
    }),
    addFloorStop: builder.mutation<void, LiftFloorStop>({
      query: ({ floorId, liftId }) => ({
        url: `/floors/${floorId}/lifts/${liftId}/add-stop`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetBuildingsQuery,
  useGetFloorsQuery,
  useLazyGetFloorsQuery,
  useRequestLiftMutation,
  useAddFloorStopMutation,
} = buildingApi;
