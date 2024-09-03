import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_API_URL } from '@/config/redux/api-slice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/config/redux/store';
import {
  ErrorState,
  EventLog,
  isSuccessState,
  ListResponse,
  ReduxState,
  SuccessState,
} from '@/types/types';

const initialState: ReduxState<ListResponse<EventLog>> = {
  status: 'idle',
  data: null,
  error: null,
};

export type GetEventLogsParam = {
  buildingId: string;
};

export const getEventLogs = createAsyncThunk(
  'event-log/getEventLogs',
  async ({ buildingId }: GetEventLogsParam): Promise<ListResponse<EventLog>> => {
    const requestOptions = {
      method: 'GET',
    };
    const response = await fetch(
      `${BASE_API_URL}buildings/${buildingId}/event-logs`,
      requestOptions,
    );
    return response.json();
  },
);

const eventLogSlice = createSlice({
  name: 'event-log',
  initialState,
  reducers: {
    addEventLog: (state: ReduxState<ListResponse<EventLog>>, action: PayloadAction<EventLog>) => {
      const newLog = action.payload;
      if (isSuccessState(state)) {
        const eventLogs = state.data.content;
        eventLogs.unshift(newLog);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEventLogs.pending, (state: ReduxState<ListResponse<EventLog>>) => {
        state.status = 'loading';
      })
      .addCase(getEventLogs.rejected, (state: ReduxState<ListResponse<EventLog>>, action: any) => {
        state.status = 'error';
        (state as ErrorState).error = action?.error?.message;
      })
      .addCase(
        getEventLogs.fulfilled,
        (
          state: ReduxState<ListResponse<EventLog>>,
          action: PayloadAction<ListResponse<EventLog>>,
        ) => {
          state.status = 'success';
          (state as SuccessState<ListResponse<EventLog>>).data = action.payload;
        },
      );
  },
});

export const { addEventLog } = eventLogSlice.actions;

export const selectEventLogs = (state: RootState) => {
  if (isSuccessState(state.eventLog)) {
    return (state.eventLog as SuccessState<ListResponse<EventLog>>).data.content;
  }
};

export default eventLogSlice.reducer;
