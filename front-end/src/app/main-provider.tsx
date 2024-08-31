import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Provider } from 'react-redux';
import { StompSessionProvider } from 'react-stomp-hooks';

import { store } from '@/config/redux/store';
import { theme } from '@/config/theme/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

const API_BASE_URL_WEB_SOCKET = import.meta.env.VITE_API_BASE_URL_WEB_SOCKET;
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StompSessionProvider url={API_BASE_URL_WEB_SOCKET}>{children}</StompSessionProvider>
      </Provider>
    </ThemeProvider>
  );
};
