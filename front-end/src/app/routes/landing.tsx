import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/config/redux/hook';
import { RootState } from '@/config/redux/store';
import { getAuthorizationUrl } from '@/lib/oauth';

export const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/app/elevator', { replace: true });
    }
    window.location.href = getAuthorizationUrl();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ mb: 4 }}>
          Welcome
        </Typography>
        <Button variant="contained" onClick={handleStart}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};
