import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import LoadingIndicator from '@/components/ui/loading-indicator/loading-indicator';
import { useGetBuildingsQuery, useLazyGetFloorsQuery } from '@/features/floor/building-slice';
import Floors from '@/features/floor/floors';
import Lifts from '@/features/lift/lifts';
import { Floor } from '@/types/types';

export const Elevator = () => {
  const [selectedBuilding, setSelectedBuildingId] = useState<string | undefined>();
  const [selectedFloor, setSelectedFloor] = useState<Floor | undefined>();
  const {
    data: buildingResponse,
    isSuccess: buildingSuccess,
    isLoading: buildingLoading,
  } = useGetBuildingsQuery();
  const [trigger, { data: floorResponse, isSuccess: floorSuccess, isLoading: floorLoading }] =
    useLazyGetFloorsQuery();

  useEffect(() => {
    if (buildingResponse) {
      setSelectedBuildingId(buildingResponse.content[0].id);
    }
  }, [buildingResponse]);

  useEffect(() => {
    if (selectedBuilding) {
      trigger(selectedBuilding);
    }
  }, [selectedBuilding, trigger]);

  useEffect(() => {
    if (floorResponse) {
      setSelectedFloor(floorResponse.content[0]);
    }
  }, [floorResponse]);

  const isLoading = buildingLoading || floorLoading;
  const isSuccess = buildingSuccess && floorSuccess;
  const dataLoaded = selectedBuilding != null && selectedFloor != null;
  return (
    <Grid container style={{ height: '100%' }}>
      {isLoading && <LoadingIndicator />}
      {isSuccess && (
        <>
          <Grid
            item
            borderRight="1px solid rgba(0, 0, 0, 0.12)"
            height={'100vh'}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              height: '100vh',
              overflow: 'hidden',
              width: '440px',
            }}
          >
            <Box sx={{ bgcolor: 'white', height: '100%', pt: 7.5 }}>
              <Floors
                buildings={buildingResponse.content}
                floors={floorResponse.content}
                selectedBuilding={selectedBuilding as string}
                setSelectedBuildingId={setSelectedBuildingId}
                selectedFloor={selectedFloor as Floor}
                setSelectedFloor={setSelectedFloor}
              />
            </Box>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '440px' }}>
            {!dataLoaded && <LoadingIndicator />}
            {dataLoaded && <Lifts buildingId={selectedBuilding} floor={selectedFloor} />}
          </Grid>
        </>
      )}
    </Grid>
  );
};
