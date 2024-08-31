import { configureStore } from '@reduxjs/toolkit';

import liftReducer from '@/features/lift/lift-slice';
import authReducer from '@/features/login/auth-slice';

import { apiSlice } from './api-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lift: liftReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
