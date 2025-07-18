import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyConverter } from '../pages/CurrencyConverter';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import { mockRatesData } from './mocks/ratesData';

vi.mock('../utils/ratesData', () => ({
  useRatesData: () => ({
    data: mockRatesData,
    isLoading: false,
    error: null,
  }),
}));

describe('CurrencyConverter', () => {
  it('renders input fields and convert button', () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );
    expect(
      screen.getByRole('textbox', { name: /amount/i }),
    ).toBeInTheDocument();
    // Use getAllByLabelText and check at least one is present for Mantine Selects
    expect(screen.getAllByLabelText(/from/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/to/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: /convert/i }),
    ).toBeInTheDocument();
  });

  it('performs conversion from CZK to USD', () => {
    render(
      <MantineProvider>
        <CurrencyConverter defaultFrom="CZK" defaultTo="USD" />
      </MantineProvider>,
    );
    fireEvent.change(screen.getByRole('textbox', { name: /amount/i }), {
      target: { value: 100 },
    });
    fireEvent.click(screen.getByRole('button', { name: /convert/i }));
    // Use getAllByText and check at least one matches
    expect(
      screen.getAllByText((content, node) =>
        node?.textContent
          ? /100 CZK = 4\.4444 USD/.test(node.textContent)
          : false,
      ).length,
    ).toBeGreaterThan(0);
  });

  it('performs conversion from USD to EUR', () => {
    render(
      <MantineProvider>
        <CurrencyConverter defaultFrom="USD" defaultTo="EUR" />
      </MantineProvider>,
    );
    fireEvent.change(screen.getByRole('textbox', { name: /amount/i }), {
      target: { value: 10 },
    });
    fireEvent.click(screen.getByRole('button', { name: /convert/i }));
    expect(
      screen.getAllByText((content, node) =>
        node?.textContent
          ? /10 USD = 9\.2593 EUR/.test(node.textContent)
          : false,
      ).length,
    ).toBeGreaterThan(0);
  });

  it('shows nothing if required fields are missing', () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /convert/i }));
    expect(screen.queryByText(/=/)).not.toBeInTheDocument();
  });

  it('disables convert button if fields are empty', () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );
    expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled();
  });

  it('shows correct options in currency selects', () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );
    // Use getAllByLabelText to get all From selects, then fireEvent on the first
    const fromSelects = screen.getAllByLabelText(/from/i);
    fireEvent.mouseDown(fromSelects[0]);
    // Use getAllByText and check at least one for each currency
    expect(screen.getAllByText('CZK').length).toBeGreaterThan(0);
    expect(screen.getAllByText('USD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EUR').length).toBeGreaterThan(0);
  });
});
