import { apiSlice } from '@/config/redux/api-slice';
import { Building, Floor, ListResponse } from '@/types/types';

export const buildingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuildings: builder.query<ListResponse<Building>, void>({
      query: () => ({ url: 'buildings' }),
    }),
    getFloors: builder.query<ListResponse<Floor>, string>({
      query: (buildingId) => ({ url: `buildings/${buildingId}/floors` }),
    }),
  }),
});

export const { useGetBuildingsQuery, useGetFloorsQuery } = buildingApi;
