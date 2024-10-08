import { Box, Button, TextField, Typography } from '@mui/material';
import { sortBy } from 'lodash';
import { useState, useTransition } from 'react';

import { Floor } from '@/types/types';

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

export type FloorSelectionProps = {
  floorSelectionMaxHeight: string;
  floors: Floor[];
  selectedFloorNumbers: number[];
  selectFloor: (value: Floor) => void;
};

export default function FLoorSelection({
  floorSelectionMaxHeight,
  floors,
  selectedFloorNumbers,
  selectFloor,
}: FloorSelectionProps) {
  const [, startTransition] = useTransition();
  const [searchedFloorNumber, setSearchedFloorNumber] = useState<number | undefined>();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    startTransition(() => {
      setSearchedFloorNumber(Number.parseInt(value));
    });
  }
  const selectedFloor = floors.find((floor) => selectedFloorNumbers.includes(floor.number));
  const selectedFloors = findNearestFloors(floors, selectedFloor!, searchedFloorNumber);
  return (
    <>
      <TextField
        sx={{ mb: 1 }}
        label="Search Floor"
        variant="outlined"
        fullWidth
        value={searchedFloorNumber}
        onChange={handleInputChange}
        type="number"
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          maxHeight: floorSelectionMaxHeight,
          overflow: 'auto',
        }}
      >
        {selectedFloors.map((floor) => (
          <FloorItem
            key={floor.id}
            selectedFloorNumbers={selectedFloorNumbers}
            floor={floor}
            selectFloor={selectFloor}
          />
        ))}
      </Box>
    </>
  );
}

export type FloorItemProps = {
  selectedFloorNumbers: number[];
  floor: Floor;
  selectFloor: (value: Floor) => void;
};

function FloorItem({ selectedFloorNumbers, floor, selectFloor }: FloorItemProps) {
  return (
    <Button
      sx={{
        p: 1,
        minWidth: 90,
        backgroundColor: selectedFloorNumbers.includes(floor.number) ? 'grey.300' : '',
      }}
      variant="outlined"
      onClick={() => selectFloor(floor)}
    >
      <Typography variant="h3">{floor.number}</Typography>
    </Button>
  );
}
