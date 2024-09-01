import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

import { Lift } from '@/types/types';

import { useGetFloorsQuery } from '../floor/building-slice';
import FoorSelection from '../floor/floor-selection';

import LiftStatusBar from './lift-status';

export type LiftInsideProps = {
  buildingId: string;
  lift: Lift;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function LiftInside({ buildingId, lift, open, setOpen }: LiftInsideProps) {
  const { data, isSuccess } = useGetFloorsQuery(buildingId);

  const floors = isSuccess ? data.content : [];
  return (
    <>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="lift-name" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="lift-name">
          {lift.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <LiftStatusBar lift={lift} />
          <Divider />
          <SelectedStops stops={lift.floorStops} />
          <Divider />
          <Box sx={{ mt: 1 }}>
            <FoorSelection
              floorSelectionMaxHeight="240px"
              floors={floors}
              selectedFloorId={lift.currentFloorId}
              selectFloor={() => null}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Open Door</Button>
          <Button onClick={() => setOpen(false)}>Close Door</Button>
          <Button onClick={() => setOpen(false)}>Exit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type SelectedStopsProps = {
  stops: number[];
};

function SelectedStops({ stops }: SelectedStopsProps) {
  return (
    <Box sx={{ paddingY: 2 }}>
      <Typography>Selected Floors </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', maxHeight: '100px', gap: 1, overflow: 'auto' }}>
        {stops.map((stop) => (
          <Typography
            variant="h6"
            sx={{
              padding: 0.5,
              border: '2px solid black',
              borderRadius: '10%',
            }}
            key={stop}
          >
            {stop}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
