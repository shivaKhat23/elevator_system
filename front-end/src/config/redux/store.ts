import { configureStore } from '@reduxjs/toolkit';

import { counterApi } from '@/features/counter/counter-slice';
import authReducer from '@/features/login/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [counterApi.reducerPath]: counterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(counterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
