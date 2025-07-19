import { render, screen } from '@testing-library/react';
import { CurrencyConverter } from '../pages/CurrencyConverter';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import { mockRatesData } from './mocks/ratesData';
import userEvent from '@testing-library/user-event';

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

  it('performs conversion from CZK to USD', async () => {
    render(
      <MantineProvider>
        <CurrencyConverter defaultFrom="CZK" defaultTo="USD" />
      </MantineProvider>,
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /amount/i }),
      '100',
    );
    await userEvent.click(screen.getByRole('button', { name: /convert/i }));

    expect(
      screen.getByText('100 CZK = 4.4444 USD', { exact: false }),
    ).toBeInTheDocument();
  });

  it('performs conversion from USD to EUR', async () => {
    render(
      <MantineProvider>
        <CurrencyConverter defaultFrom="USD" defaultTo="EUR" />
      </MantineProvider>,
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /amount/i }),
      '10',
    );
    await userEvent.click(screen.getByRole('button', { name: /convert/i }));

    expect(
      screen.getByText('10 USD = 9.2593 EUR', { exact: false }),
    ).toBeInTheDocument();
  });

  it('shows nothing if required fields are missing', async () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: /convert/i }));

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

  it('shows correct options in currency selects', async () => {
    render(
      <MantineProvider>
        <CurrencyConverter />
      </MantineProvider>,
    );

    const fromSelects = screen.getAllByLabelText(/from/i);
    await userEvent.click(fromSelects[0]);

    expect(screen.getAllByText('CZK').length).toBeGreaterThan(0);
    expect(screen.getAllByText('USD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EUR').length).toBeGreaterThan(0);
  });
});
