import { Outlet } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';

export const RootApp = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
