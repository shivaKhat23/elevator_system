import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ['counter', 'floor', 'building'],
  endpoints: () => ({}),
});
