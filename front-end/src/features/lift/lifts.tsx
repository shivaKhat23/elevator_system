import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { Box, Button, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { Floor, Lift, LiftStatus } from '@/types/types';

import { getLifts, selectLifts } from './lift-slice';
import LiftInside from './lift-inside';

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

  return (
    <Box sx={{ pt: 7.5, px: 2, display: 'flex', gap: 2 }}>
      {lifts.map((lift) => (
        <LiftItem key={lift.id} lift={lift} currentFloor={floor} />
      ))}
    </Box>
  );
}

export type LiftItemProps = {
  lift: Lift;
  currentFloor: Floor;
};

function LiftItem({ lift, currentFloor }: LiftItemProps) {
  const [goInside, setGoInside] = useState<boolean>(false);
  const canDoorBeOpened =
    lift.currentFloorNumber === currentFloor.number && lift.status == LiftStatus.IDLE;
  return (
    <Paper sx={{ width: '30%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
        <Box sx={{ paddingX: 1, paddingTop: 1 }}>
          <Typography variant="h5">{lift.name}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            backgroundColor: '#212121',
            color: 'white',
            width: '100%',
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'baseline',
            marginY: 1,
          }}
        >
          {getIconforLift(lift.status)}
          <Typography variant="h4">{lift.currentFloorNumber}</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            fullWidth
            disabled={!canDoorBeOpened}
            onClick={() => setGoInside(true)}
          >
            {canDoorBeOpened ? 'Enter Lift' : 'Closed'}
          </Button>
          <LiftInside open={goInside} setOpen={setGoInside} />
        </Box>
      </Box>
    </Paper>
  );
}

function getIconforLift(status: LiftStatus) {
  switch (status) {
    case LiftStatus.MOVING_UP:
      return <ArrowUpwardIcon fontSize="medium" />;
    case LiftStatus.MOVING_DOWN:
      return <ArrowDownwardIcon fontSize="medium" />;
    case LiftStatus.IDLE:
    default:
      return <MultipleStopIcon fontSize="medium" />;
  }
}
