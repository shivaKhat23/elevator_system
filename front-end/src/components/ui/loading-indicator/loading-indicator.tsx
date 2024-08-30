import { Box, CircularProgress } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Box
      data-testid="loading-indicator"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default LoadingIndicator;
