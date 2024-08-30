import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { useAppDispatch, useAppSelector } from '@/config/redux/hook';
import { handleTokenRefresh } from '@/features/login/auth-slice';

// 15 min refresh interval
const REFRESH_INTERVAL = 15 * 60 * 1000;
export const RootApp = () => {
  const dispatch = useAppDispatch();

  const { refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (refreshToken) {
        dispatch(handleTokenRefresh(refreshToken));
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, refreshToken]);

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
