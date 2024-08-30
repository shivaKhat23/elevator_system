import { apiSlice } from '@/config/redux/api-slice';

export interface CounterResponse {
  count: number;
}

export const counterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounter: builder.query<CounterResponse, void>({
      query: () => ({ url: 'counter' }),
    }),
    startCounter: builder.mutation<void, void>({
      query: () => ({ url: 'counter', method: 'PUT' }),
    }),
  }),
});

export const { useGetCounterQuery, useStartCounterMutation } = counterApi;
