import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mantine/core/styles.css';

import { Layout, Section } from './Layout';
import { RatesDataProvider } from './utils/ratesData';
import { CurrencyRates } from './pages/CurrencyRates';
import { CurrencyConverter } from './pages/CurrencyConverter';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('rates');
  const [converterDefaults, setConverterDefaults] = useState<{
    from?: string;
    to?: string;
  }>({});

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RatesDataProvider>
          <Layout section={section} onSectionChange={setSection}>
            {section === 'rates' && (
              <CurrencyRates
                onConvertFrom={(code) => {
                  setConverterDefaults({ from: code, to: 'CZK' });
                  setSection('converter');
                }}
                onConvertTo={(code) => {
                  setConverterDefaults({ from: 'CZK', to: code });
                  setSection('converter');
                }}
              />
            )}
            {section === 'converter' && (
              <CurrencyConverter
                defaultFrom={converterDefaults.from}
                defaultTo={converterDefaults.to}
              />
            )}
          </Layout>
        </RatesDataProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
