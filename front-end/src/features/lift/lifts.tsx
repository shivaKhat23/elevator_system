import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSubscription } from 'react-stomp-hooks';

import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { Floor, Lift } from '@/types/types';

import LiftItem from './lift-item';
import { getLifts, selectLifts, updateLift } from './lift-slice';

export type LiftsProps = {
  buildingId: string;
  floor?: Floor;
  setSelectedFloor?: (value: Floor) => void;
  isAdminView: boolean;
};

export default function Lifts({
  buildingId,
  floor,
  setSelectedFloor,
  isAdminView = false,
}: LiftsProps) {
  const lifts = useAppSelector(selectLifts) ?? [];
  const liftsSorted = [...lifts].sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLifts({ buildingId: buildingId }));
  }, [buildingId, dispatch]);

  useSubscription(`/topic/${buildingId}/lift`, (message) => {
    const lift: Lift = JSON.parse(message.body);
    console.log(lift);
    dispatch(updateLift(lift));
  });

  return (
    <Box sx={{ pt: 7.5, px: 2, display: 'flex', gap: 2 }}>
      {liftsSorted.map((lift) => (
        <LiftItem
          buildingId={buildingId}
          key={lift.id}
          lift={lift}
          currentFloor={floor}
          setSelectedFloor={setSelectedFloor}
          isAdminView={isAdminView}
        />
      ))}
    </Box>
  );
}
