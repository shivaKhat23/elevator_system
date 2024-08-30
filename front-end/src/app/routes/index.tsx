import { createBrowserRouter } from 'react-router-dom';

import { RootApp } from './app/root.tsx';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingPage } = await import('./landing.tsx');
        return { Component: LandingPage };
      },
    },
    {
      path: '/callback',
      lazy: async () => {
        const { Callback } = await import('./callback.tsx');
        return { Component: Callback };
      },
    },
    {
      path: '/app',
      element: <RootApp />,
      children: [
        {
          path: 'admin',
          lazy: async () => {
            const { Admin } = await import('./app/admin/admin.tsx');
            return { Component: Admin };
          },
        },
        {
          path: 'elevator',
          lazy: async () => {
            const { Elevator } = await import('./app/elevator/elevator.tsx');
            return { Component: Elevator };
          },
        },
        {
          path: 'settings',
          lazy: async () => {
            const { Setting } = await import('./app/setting/setting.tsx');
            return { Component: Setting };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundPage } = await import('./not-found.tsx');
        return { Component: NotFoundPage };
      },
    },
  ]);
