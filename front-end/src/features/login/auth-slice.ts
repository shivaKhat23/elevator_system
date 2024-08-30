import { createAsyncThunk, createSlice, GetThunkAPI, PayloadAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';

import { handleCallback, refreshAccessToken } from '@/lib/oauth';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: null,
};

export const handleOAuthCallback = createAsyncThunk(
  'authorization/handleOAuthCallback',
  async (search: string, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    try {
      const data = await handleCallback(search);
      thunkAPI.dispatch(
        setAuth({
          token: data.access_token,
          refreshToken: data.refresh_token,
          user: data.id_token,
        }),
      );
    } catch (error) {
      console.error('Oauth callback error', error);
    }
  },
);

export const handleTokenRefresh = createAsyncThunk(
  'authorization/handleTokenRefresh',
  async (refreshToken: string) => {
    const data = await refreshAccessToken(refreshToken);
    return {
      token: data.access_token,
      refreshToken: data.refresh_token,
      user: data.id_token,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; refreshToken: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        handleTokenRefresh.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            refreshToken: string;
            user: any;
          }>,
        ) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        },
      )
      .addCase(handleTokenRefresh.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
