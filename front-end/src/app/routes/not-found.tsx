import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h1">404 - Not Found</Typography>
        <Typography>Sorry, the page you are looking for does not exists.</Typography>
        <Link to="/">Go to home</Link>
      </Box>
    </Container>
  );
};
