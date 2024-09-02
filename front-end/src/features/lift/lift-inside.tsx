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
} from '@mui/material';

import { Floor, Lift, LiftStatus } from '@/types/types';

import { useAddFloorStopMutation, useGetFloorsQuery } from '../floor/building-slice';
import FLoorSelection from '../floor/floor-selection';

import LiftStatusBar from './lift-status';
import SelectedStops from './selected-stops';

export type LiftInsideProps = {
  buildingId: string;
  lift: Lift;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  setSelectedFloor: (value: Floor) => void;
  isAdminView: boolean;
};

export default function LiftInside({
  buildingId,
  lift,
  open,
  setOpen,
  setSelectedFloor,
  isAdminView,
}: LiftInsideProps) {
  const { data, isSuccess } = useGetFloorsQuery(buildingId);
  const [addFloorStop] = useAddFloorStopMutation();

  const handleAddFloorStop = (floor: Floor) => {
    addFloorStop({ floorId: floor.id, liftId: lift.id });
  };

  const handleClose = () => {
    if (!isAdminView) {
      setSelectedFloor({
        id: lift.currentFloorId,
        number: lift.currentFloorNumber,
        buildingId: lift.buildingId,
      });
    }
    setOpen(false);
  };

  const floors = isSuccess ? data.content : [];
  const exitPossible = lift.status === LiftStatus.IDLE || lift.status === LiftStatus.STAND_BY;
  return (
    <>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="lift-name" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="lift-name">
          {lift.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          disabled={!exitPossible}
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
            <FLoorSelection
              floorSelectionMaxHeight="240px"
              floors={floors}
              selectedFloorNumbers={lift.floorStops}
              selectFloor={handleAddFloorStop}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={!exitPossible}>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
