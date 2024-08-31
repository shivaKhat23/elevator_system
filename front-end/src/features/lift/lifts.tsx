import { Box, Typography } from '@mui/material';

import { Floor, isSuccessState } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { useEffect } from 'react';
import { getLifts, selectLifts } from './lift-slice';

export type LiftsProps = {
  buildingId: string;
  floor: Floor;
};

export default function Lifts({ buildingId, floor }: LiftsProps) {
  const lifts = useAppSelector(selectLifts) ?? [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLifts({ buildingId: buildingId }));
  }, [buildingId, dispatch]);

  return (
    <Box sx={{ pt: 7.5 }}>
      <Typography>{buildingId}</Typography>
      <Typography>{floor.number}</Typography>
      {lifts.map((lift) => (
        <Typography key={lift.id}>{JSON.stringify(lift)}</Typography>
      ))}
    </Box>
  );
}
