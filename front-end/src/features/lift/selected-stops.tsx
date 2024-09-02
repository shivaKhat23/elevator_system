import { Box, Typography } from '@mui/material';

type SelectedStopsProps = {
  stops: number[];
};

export default function SelectedStops({ stops }: SelectedStopsProps) {
  const floorIsSelected = stops.length > 0;
  return (
    <Box sx={{ paddingY: 2 }}>
      <Typography>Selected Floors </Typography>
      {!floorIsSelected && <Typography variant="subtitle2">No Floors Selected</Typography>}
      {floorIsSelected && (
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', maxHeight: '100px', gap: 1, overflow: 'auto' }}
        >
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
      )}
    </Box>
  );
}
