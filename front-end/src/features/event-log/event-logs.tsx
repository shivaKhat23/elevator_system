import InfoIcon from '@mui/icons-material/Info';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useSubscription } from 'react-stomp-hooks';

import LoadingIndicator from '@/components/ui/loading-indicator/loading-indicator';
import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { EventLog, EventType, Floor, Lift } from '@/types/types';

import { useGetFloorsQuery } from '../floor/building-slice';
import { getLifts, selectLifts } from '../lift/lift-slice';

import { addEventLog, getEventLogs, selectEventLogs } from './event-log-slice';
export type EventLogsProps = {
  buildingId: string;
};

function convertToMap<T extends { id: string }>(items: T[]): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of items) {
    map.set(item.id, item);
  }
  return map;
}

export default function EventLogs({ buildingId }: EventLogsProps) {
  const eventLogs = useAppSelector(selectEventLogs) ?? [];
  const lifts = useAppSelector(selectLifts) ?? [];
  const { data: floorResponse } = useGetFloorsQuery(buildingId);
  const floors = floorResponse?.content ?? [];
  const dispatch = useAppDispatch();

  const liftIdToLift = useMemo(() => convertToMap(lifts), [lifts]);
  const floorIdToFloor = useMemo(() => convertToMap(floors), [floors]);

  useEffect(() => {
    dispatch(getEventLogs({ buildingId }));
  }, [buildingId, dispatch]);

  useEffect(() => {
    if (!(lifts.length > 0)) {
      dispatch(getLifts({ buildingId }));
    }
  }, [buildingId, dispatch, lifts.length]);

  useSubscription(`/topic/${buildingId}/event-log`, (message) => {
    const eventLog: EventLog = JSON.parse(message.body);
    // console.log(eventLog);
    dispatch(addEventLog(eventLog));
  });

  const dataLoaded = lifts.length > 0 && floors.length > 0;

  if (!dataLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Typography variant="h5">Event Log</Typography>
      <List dense={true} sx={{ maxHeight: 550, overflowY: 'auto' }}>
        {eventLogs.map((eventLog) => (
          <ListItem
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              marginBottom: 1,
              padding: 1,
            }}
            key={eventLog.id}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={getEventDescription(eventLog, liftIdToLift, floorIdToFloor)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function getEventDescription(
  eventLog: EventLog,
  liftIdToLift: Map<string, Lift>,
  floorIdToFloor: Map<string, Floor>,
): string {
  const liftName = liftIdToLift.get(eventLog.liftId)?.name;
  const floorNumber = floorIdToFloor.get(eventLog.floorId)?.number;
  switch (eventLog.eventType) {
    case EventType.FLOOR_REQUEST:
      return `Lift requested from floor number ${floorNumber} `;
    case EventType.FLOOR_STOP_ADD:
      return `Floor number ${floorNumber} added as stop for ${liftName}`;
    default:
      return 'Unknown event type';
  }
}
