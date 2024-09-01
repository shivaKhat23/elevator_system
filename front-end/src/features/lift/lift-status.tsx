import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { Box, Typography } from '@mui/material';

import { Lift, LiftStatus } from '@/types/types';

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

export type LiftStatusProps = {
  lift: Lift;
};

export default function LiftStatusBar({ lift }: LiftStatusProps) {
  return (
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
  );
}
