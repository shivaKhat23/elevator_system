import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@/config/redux/store';
import { theme } from '@/config/theme/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
