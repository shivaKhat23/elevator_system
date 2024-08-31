import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { sortBy } from 'lodash';
import { useState, useTransition } from 'react';

import { Building, Floor } from '@/types/types';

export type FloorsProps = {
  buildings: Building[];
  floors: Floor[];
  selectedBuilding: string;
  setSelectedBuildingId: (value: string) => void;
  selectedFloor: Floor;
  setSelectedFloor: (value: Floor) => void;
};

function findNearestFloors(
  floors: Floor[],
  selectedFloor: Floor,
  selectedNumber?: number,
  numberToReturn: number = 10,
): Floor[] {
  if (!selectedNumber) {
    return floors;
  }
  const floorToDiff = new Map<string, number>();
  for (const floor of floors) {
    const diff = Math.abs(selectedNumber - floor.number);
    floorToDiff.set(floor.id, diff);
  }
  const sortedByDiffList = sortBy(floors, [(floor: Floor) => floorToDiff.get(floor.id)]);

  const selectedList = sortedByDiffList.slice(0, numberToReturn);
  if (!selectedList.includes(selectedFloor)) {
    selectedList.push(selectedFloor);
  }
  return sortBy(selectedList, ['number']);
}

export default function Floors({
  buildings,
  floors,
  selectedBuilding,
  setSelectedBuildingId,
  selectedFloor,
  setSelectedFloor,
}: FloorsProps) {
  const [, startTransition] = useTransition();
  const [searchedFloorNumber, setSearchedFloorNumber] = useState<number | undefined>();

  const handleBuildingSelect = (event) => {
    const selectedBuildingId = event.target.value as string;
    console.log(selectedBuildingId);
    setSelectedBuildingId(selectedBuildingId);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    startTransition(() => {
      setSearchedFloorNumber(Number.parseInt(value));
    });
  }
  const selectedFloors = findNearestFloors(floors, selectedFloor, searchedFloorNumber);
  return (
    <>
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <FormControl fullWidth>
          <Select id="building-select" value={selectedBuilding} onChange={handleBuildingSelect}>
            {buildings.map((building) => (
              <MenuItem key={building.id} value={building.id}>
                {building.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider orientation="horizontal" sx={{ mt: 2 }} />
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <TextField
          sx={{ mb: 1 }}
          label="Search Floor"
          variant="outlined"
          fullWidth
          value={searchedFloorNumber}
          onChange={handleInputChange}
          type="number"
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedFloors.map((floor) => (
            <FloorItem
              key={floor.id}
              selectedFloor={selectedFloor}
              floor={floor}
              setSelectedFloor={setSelectedFloor}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export type FloorItemProps = {
  selectedFloor: Floor;
  floor: Floor;
  setSelectedFloor: (value: Floor) => void;
};

function FloorItem({ selectedFloor, floor, setSelectedFloor }: FloorItemProps) {
  return (
    <Button
      sx={{
        p: 1,
        minWidth: 90,
        backgroundColor: selectedFloor?.id === floor.id ? 'grey.300' : '',
      }}
      variant="outlined"
      onClick={() => setSelectedFloor(floor)}
    >
      <Typography variant="h3">{floor.number}</Typography>
    </Button>
  );
}
