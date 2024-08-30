import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/app/admin');
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
