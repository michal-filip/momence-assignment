import React from 'react';
import { Layout } from './Layout';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import { CurrencyRates } from './pages/CurrencyRates';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Layout>
          <CurrencyRates />
        </Layout>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
