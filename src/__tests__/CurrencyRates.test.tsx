import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CurrencyRates } from '../pages/CurrencyRates';
import { MantineProvider } from '@mantine/core';

describe('CurrencyRates', () => {
  it('renders a list of currencies', () => {
    render(
      <MantineProvider>
        <CurrencyRates onConvertFrom={() => {}} onConvertTo={() => {}} />
      </MantineProvider>,
    );
    expect(screen.getByText('Currency Rates')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Dollar')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('Eurozone')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });
});
