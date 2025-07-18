import React, { useState } from 'react';
import { Layout, Section } from './Layout';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RatesDataProvider } from './pages/CurrencyConverter';

import '@mantine/core/styles.css';
import { CurrencyRates } from './pages/CurrencyRates';
import { CurrencyConverter } from './pages/CurrencyConverter';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('rates');
  const [converterState, setConverterState] = useState<{ from?: string; to?: string }>({});

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RatesDataProvider>
          <Layout section={section} onSectionChange={setSection}>
            {section === 'rates' && (
              <CurrencyRates
                onConvertFrom={(code) => {
                  setConverterState({ from: code, to: 'CZK' });
                  setSection('converter');
                }}
                onConvertTo={(code) => {
                  setConverterState({ from: 'CZK', to: code });
                  setSection('converter');
                }}
              />
            )}
            {section === 'converter' && (
              <CurrencyConverter from={converterState.from} to={converterState.to} />
            )}
          </Layout>
        </RatesDataProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
