import React, { useState } from 'react';
import { Layout, Section } from './Layout';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import { CurrencyRates } from './pages/CurrencyRates';
import { CurrencyConverter } from './pages/CurrencyConverter';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('rates');
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Layout section={section} onSectionChange={setSection}>
          {section === 'rates' && <CurrencyRates />}
          {section === 'converter' && <CurrencyConverter />}
        </Layout>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
