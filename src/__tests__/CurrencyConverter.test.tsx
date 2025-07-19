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

    expect(screen.getByRole('textbox', { name: /from/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /to/i })).toBeInTheDocument();
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

    expect(
      screen.getByText('100 CZK = 4.4444 USD', { exact: false }),
    ).toBeInTheDocument();
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
      screen.getByText('10 USD = 9.2593 EUR', { exact: false }),
    ).toBeInTheDocument();
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

    const fromSelects = screen.getAllByLabelText(/from/i);
    fireEvent.mouseDown(fromSelects[0]);

    expect(screen.getAllByText('CZK').length).toBeGreaterThan(0);
    expect(screen.getAllByText('USD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EUR').length).toBeGreaterThan(0);
  });
});
