import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_API_URL } from '@/config/redux/api-slice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/config/redux/store';
import {
  ErrorState,
  isSuccessState,
  Lift,
  ListResponse,
  ReduxState,
  SuccessState,
} from '@/types/types';

export type GetLiftsParam = {
  buildingId: string;
};

const initialState: ReduxState<ListResponse<Lift>> = {
  status: 'idle',
  data: null,
  error: null,
};

export const getLifts = createAsyncThunk(
  'lift/getLifts',
  async ({ buildingId }: GetLiftsParam): Promise<ListResponse<Lift>> => {
    const requestOptions = {
      method: 'GET',
    };
    const response = await fetch(`${BASE_API_URL}buildings/${buildingId}/lifts`, requestOptions);
    return response.json();
  },
);

const liftSlice = createSlice({
  name: 'lift',
  initialState,
  reducers: {
    updateLift: (state: ReduxState<ListResponse<Lift>>, action: PayloadAction<Lift>) => {
      const updatedLift = action.payload;
      if (isSuccessState(state)) {
        const lifts = state.data.content;
        const oldLiftIndex = lifts.findIndex((x) => x.id === updatedLift.id);
        lifts[oldLiftIndex] = updatedLift;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLifts.pending, (state: ReduxState<ListResponse<Lift>>) => {
        state.status = 'loading';
      })
      .addCase(getLifts.rejected, (state: ReduxState<ListResponse<Lift>>, action: any) => {
        state.status = 'error';
        (state as ErrorState).error = action?.error?.message;
      })
      .addCase(
        getLifts.fulfilled,
        (state: ReduxState<ListResponse<Lift>>, action: PayloadAction<ListResponse<Lift>>) => {
          state.status = 'success';
          (state as SuccessState<ListResponse<Lift>>).data = action.payload;
        },
      );
  },
});

export const { updateLift } = liftSlice.actions;
export const selectLifts = (state: RootState) => {
  if (isSuccessState(state.lift)) {
    return (state.lift as SuccessState<ListResponse<Lift>>).data.content;
  }
};

export default liftSlice.reducer;
