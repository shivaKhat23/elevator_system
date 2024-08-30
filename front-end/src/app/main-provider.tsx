import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Provider } from 'react-redux';
import { StompSessionProvider } from 'react-stomp-hooks';

import { store } from '@/config/redux/store';
import { theme } from '@/config/theme/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StompSessionProvider url={'http://localhost:8081/web-socket'}>
          {children}
        </StompSessionProvider>
      </Provider>
    </ThemeProvider>
  );
};
