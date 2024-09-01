import { Box, Button, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { Floor, Lift, LiftStatus } from '@/types/types';

import { useSubscription } from 'react-stomp-hooks';
import LiftInside from './lift-inside';
import { getLifts, selectLifts, updateLift } from './lift-slice';
import LiftStatusBar from './lift-status';

export type LiftsProps = {
  buildingId: string;
  floor: Floor;
};

export default function Lifts({ buildingId, floor }: LiftsProps) {
  const lifts = useAppSelector(selectLifts) ?? [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLifts({ buildingId: buildingId }));
  }, [buildingId, dispatch]);

  useSubscription(`/topic/${buildingId}/lift`, (message) => {
    const lift: Lift = JSON.parse(message.body);
    console.log(lift);
    dispatch(updateLift(lift));
  });

  return (
    <Box sx={{ pt: 7.5, px: 2, display: 'flex', gap: 2 }}>
      {lifts.map((lift) => (
        <LiftItem buildingId={buildingId} key={lift.id} lift={lift} currentFloor={floor} />
      ))}
    </Box>
  );
}

export type LiftItemProps = {
  buildingId: string;
  lift: Lift;
  currentFloor: Floor;
};

function LiftItem({ buildingId, lift, currentFloor }: LiftItemProps) {
  const [goInside, setGoInside] = useState<boolean>(false);
  const canDoorBeOpened =
    lift.currentFloorNumber === currentFloor.number &&
    (lift.status == LiftStatus.IDLE || lift.status == LiftStatus.STAND_BY);
  return (
    <Paper sx={{ width: '30%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
        <Box sx={{ paddingX: 1, paddingTop: 1 }}>
          <Typography variant="h5">{lift.name}</Typography>
        </Box>
        <Divider />
        <LiftStatusBar lift={lift} />
        <Box>
          <Button
            variant="outlined"
            fullWidth
            disabled={!canDoorBeOpened}
            onClick={() => setGoInside(true)}
          >
            {canDoorBeOpened ? 'Enter Lift' : 'Closed'}
          </Button>
          <LiftInside buildingId={buildingId} lift={lift} open={goInside} setOpen={setGoInside} />
        </Box>
      </Box>
    </Paper>
  );
}
