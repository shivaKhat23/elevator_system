import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';

import { CounterResponse, useGetCounterQuery, useStartCounterMutation } from './counter-slice';

export default function CounterFeature() {
  const [counter, setCount] = useState<number | null>(null);
  const { data, isLoading, isError } = useGetCounterQuery();
  const [startCounter] = useStartCounterMutation();

  useSubscription('/topic/counter', (message) => {
    const counter: CounterResponse = JSON.parse(message.body);
    setCount(counter.count);
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Paper
        sx={{
          mt: 10,
          p: 2,
          width: '25%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h1" textAlign={'center'}>
          {counter == null ? data?.count : counter}
        </Typography>
        <Button variant="contained" onClick={() => startCounter()}>
          Start Counter
        </Button>
      </Paper>
    </Box>
  );
}
