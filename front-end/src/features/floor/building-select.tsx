import { FormControl, MenuItem, Select } from '@mui/material';

import { Building } from '@/types/types';

export type BuildingSelectProps = {
  buildings: Building[];
  selectedBuilding: string;
  setSelectedBuildingId: (value: string) => void;
};

export default function BuildingSelect({
  buildings,
  selectedBuilding,
  setSelectedBuildingId,
}: BuildingSelectProps) {
  const handleBuildingSelect = (event) => {
    const selectedBuildingId = event.target.value as string;
    setSelectedBuildingId(selectedBuildingId);
  };

  return (
    <FormControl fullWidth>
      <Select id="building-select" value={selectedBuilding} onChange={handleBuildingSelect}>
        {buildings.map((building) => (
          <MenuItem key={building.id} value={building.id}>
            {building.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
