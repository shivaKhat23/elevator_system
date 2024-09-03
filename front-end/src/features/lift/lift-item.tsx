import { Box, Button, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

import { Floor, Lift, LiftStatus } from '@/types/types';

import LiftInside from './lift-inside';
import LiftStatusBar from './lift-status';
import SelectedStops from './selected-stops';

export type LiftItemProps = {
  buildingId: string;
  lift: Lift;
  currentFloor?: Floor;
  setSelectedFloor?: (value: Floor) => void;
  isAdminView: boolean;
};

export default function LiftItem({
  buildingId,
  lift,
  currentFloor,
  setSelectedFloor,
  isAdminView,
}: LiftItemProps) {
  const [goInside, setGoInside] = useState<boolean>(false);

  const canDoorBeOpened =
    isAdminView ||
    (lift.currentFloorNumber === currentFloor?.number &&
      (lift.status == LiftStatus.IDLE || lift.status == LiftStatus.STAND_BY));
  return (
    <Paper sx={{ width: '30%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 1,
        }}
      >
        <Box sx={{ paddingX: 1, paddingTop: 1 }}>
          <Typography variant="h5">{lift.name}</Typography>
        </Box>
        <Divider />
        <LiftStatusBar lift={lift} />
        {isAdminView && (
          <>
            <Divider />
            <SelectedStops stops={lift.floorStops} />
            <Divider />
          </>
        )}
        <Box>
          <Button
            variant="outlined"
            fullWidth
            disabled={!canDoorBeOpened}
            onClick={() => setGoInside(true)}
          >
            {canDoorBeOpened ? 'Enter Lift' : 'Closed'}
          </Button>
          <LiftInside
            buildingId={buildingId}
            lift={lift}
            open={goInside}
            setOpen={setGoInside}
            setSelectedFloor={setSelectedFloor!}
            isAdminView={isAdminView}
          />
        </Box>
      </Box>
    </Paper>
  );
}
