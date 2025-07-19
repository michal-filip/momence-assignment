import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CurrencyRates } from '../pages/CurrencyRates';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';

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

  it('calls onConvertFrom when a from button is clicked', () => {
    const onConvertFrom = vi.fn();
    render(
      <MantineProvider>
        <CurrencyRates onConvertFrom={onConvertFrom} onConvertTo={() => {}} />
      </MantineProvider>,
    );
    const fromButtons = screen.getAllByRole('button', { name: /from/i });
    if (fromButtons.length > 0) {
      fromButtons[0].click();
      expect(onConvertFrom).toHaveBeenCalled();
    }
  });

  it('calls onConvertTo when a to button is clicked', () => {
    const onConvertTo = vi.fn();
    render(
      <MantineProvider>
        <CurrencyRates onConvertFrom={() => {}} onConvertTo={onConvertTo} />
      </MantineProvider>,
    );
    const toButtons = screen.getAllByRole('button', { name: /to/i });
    if (toButtons.length > 0) {
      toButtons[0].click();
      expect(onConvertTo).toHaveBeenCalled();
    }
  });

  it('renders currency codes and names for all listed currencies', () => {
    render(
      <MantineProvider>
        <CurrencyRates onConvertFrom={() => {}} onConvertTo={() => {}} />
      </MantineProvider>,
    );
    expect(screen.getAllByText(/USD|EUR|CZK/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dollar|Euro|Koruna/).length).toBeGreaterThan(0);
  });
});
