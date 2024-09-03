import { Box, Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import LoadingIndicator from '@/components/ui/loading-indicator/loading-indicator';
import EventLogs from '@/features/event-log/event-logs';
import BuildingSelect from '@/features/floor/building-select';
import { useGetBuildingsQuery } from '@/features/floor/building-slice';
import Lifts from '@/features/lift/lifts';

export const Admin = () => {
  const [selectedBuilding, setSelectedBuildingId] = useState<string | undefined>();
  const { data: buildingResponse, isLoading } = useGetBuildingsQuery();

  useEffect(() => {
    if (buildingResponse?.content != null) {
      console.log(buildingResponse.content[0].id);
      setSelectedBuildingId(buildingResponse.content[0].id);
    }
  }, [buildingResponse]);

  const dataLoaded = selectedBuilding != null;
  return (
    <Grid container style={{ height: '100%' }}>
      {isLoading && <LoadingIndicator />}
      {dataLoaded && (
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
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <BuildingSelect
                  buildings={buildingResponse!.content!}
                  selectedBuilding={selectedBuilding as string}
                  setSelectedBuildingId={setSelectedBuildingId}
                />
              </Box>
              <Divider />
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <EventLogs buildingId={selectedBuilding} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '440px' }}>
            {!dataLoaded && <LoadingIndicator />}
            {dataLoaded && <Lifts buildingId={selectedBuilding} isAdminView={true} />}
          </Grid>
        </>
      )}
    </Grid>
  );
};
