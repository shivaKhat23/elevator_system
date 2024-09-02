import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Box, Button, Divider, FormControl, MenuItem, Select, Typography } from '@mui/material';

import { Building, Floor, LiftRequestDirection } from '@/types/types';

import { useRequestLiftMutation } from './building-slice';
import FLoorSelection from './floor-selection';
import BuildingSelect from './building-select';

export type FloorsProps = {
  buildings: Building[];
  floors: Floor[];
  selectedBuilding: string;
  setSelectedBuildingId: (value: string) => void;
  selectedFloor: Floor;
  setSelectedFloor: (value: Floor) => void;
};

export default function Floors({
  buildings,
  floors,
  selectedBuilding,
  setSelectedBuildingId,
  selectedFloor,
  setSelectedFloor,
}: FloorsProps) {
  const [requestLift] = useRequestLiftMutation();

  const handleLiftRequest = (direction: LiftRequestDirection) => {
    requestLift({ floorId: selectedFloor.id, direction: direction });
  };

  return (
    <>
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <BuildingSelect
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          setSelectedBuildingId={setSelectedBuildingId}
        />
      </Box>
      <Divider orientation="horizontal" sx={{ mt: 2 }} />
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <FLoorSelection
          floorSelectionMaxHeight="320px"
          floors={floors}
          selectedFloorNumbers={selectedFloor?.number ? [selectedFloor.number] : []}
          selectFloor={setSelectedFloor}
        />
      </Box>
      <Divider orientation="horizontal" sx={{ mt: 2 }} />
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="h5">Call buttons</Typography>
        <Box sx={{ paddingY: 1, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ height: 120 }}
            onClick={() => handleLiftRequest(LiftRequestDirection.UP)}
          >
            <KeyboardDoubleArrowUpIcon fontSize="large" />
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ height: 120 }}
            onClick={() => handleLiftRequest(LiftRequestDirection.DOWN)}
          >
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </>
  );
}
