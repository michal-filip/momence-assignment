import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Paper,
  Title,
  Group,
  NumberInput,
  Select,
  Button,
  Alert,
} from '@mantine/core';

const API_URL = '/rates';

function parseRates(data: string) {
  // The rates are in a text format, skip header lines and parse the table
  const lines = data.split('\n').filter(Boolean);
  const startIdx = lines.findIndex((line) => line.startsWith('Country|'));
  if (startIdx === -1) return [];
  const headers = lines[startIdx].split('|');
  return lines.slice(startIdx + 1).map((line) => {
    const values = line.split('|');
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i]));
    return obj;
  });
}

const RatesDataContext = createContext<ReturnType<typeof useQuery> | undefined>(undefined);

export const RatesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const query = useQuery({
    queryKey: ['currency-rates'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch rates');
      const text = await res.text();
      return parseRates(text);
    },
  });
  return <RatesDataContext.Provider value={query}>{children}</RatesDataContext.Provider>;
};

export function useRatesData() {
  const ctx = useContext(RatesDataContext);
  if (!ctx) throw new Error('useRatesData must be used within RatesDataProvider');
  return ctx;
}

export const CurrencyConverter: React.FC<{
  from?: string;
  to?: string;
}> = ({ from: fromProp, to: toProp }) => {
  const { data, isLoading, error } = useRatesData();

  // Add CZK as the base currency
  const allCodes = Array.isArray(data) ? Array.from(new Set(data.map((row: any) => row.Code))) : [];
  if (!allCodes.includes('CZK')) allCodes.unshift('CZK');
  const currencyOptions = allCodes.map((code) => ({ value: code, label: code }));

  // Preselect CZK in 'From' field by default, or use prop if provided
  const [amount, setAmount] = useState<number | ''>('');
  const [from, setFrom] = useState<string>(fromProp || 'CZK');
  const [to, setTo] = useState<string>(toProp || '');
  const [result, setResult] = useState<number | null>(null);

  // Update fields if props change
  useEffect(() => {
    if (fromProp) setFrom(fromProp);
    if (toProp) setTo(toProp);
    setResult(null);
  }, [fromProp, toProp]);

  // Hide result when any parameter changes
  const handleAmountChange = (val: string | number) => {
    // Only allow numbers or empty string
    setAmount(typeof val === 'number' || val === '' ? val : '');
    setResult(null);
  };
  const handleFromChange = (val: string | null) => {
    setFrom(val || '');
    setResult(null);
  };
  const handleToChange = (val: string | null) => {
    setTo(val || '');
    setResult(null);
  };

  const handleConvert = () => {
    if (!Array.isArray(data) || !amount || !from || !to) return;
    // Handle CZK as base currency
    let fromRate = 1,
      toRate = 1;
    if (from !== 'CZK') {
      const fromRateObj = data.find((row: any) => row.Code === from);
      if (!fromRateObj) return;
      fromRate =
        parseFloat(fromRateObj.Rate.replace(',', '.')) /
        parseFloat(fromRateObj.Amount);
    }
    if (to !== 'CZK') {
      const toRateObj = data.find((row: any) => row.Code === to);
      if (!toRateObj) return;
      toRate =
        parseFloat(toRateObj.Rate.replace(',', '.')) /
        parseFloat(toRateObj.Amount);
    }
    // Convert from -> CZK -> to
    const czk = (amount as number) * fromRate;
    const converted = czk / toRate;
    setResult(Number.isFinite(converted) ? converted : null);
  };

  return (
    <Paper p="md" withBorder style={{ flex: 1 }}>
      <Title order={2} mb="md">
        Currency Converter
      </Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConvert();
        }}
      >
        <Group mb="md" grow>
          <NumberInput
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            min={0}
            required
          />
          <Select
            label="From"
            data={currencyOptions}
            value={from}
            onChange={handleFromChange}
            required
            searchable
          />
          <Select
            label="To"
            data={currencyOptions}
            value={to}
            onChange={handleToChange}
            required
            searchable
          />
        </Group>
        <Button type="submit" disabled={!amount || !from || !to || !Array.isArray(data)}>
          Convert
        </Button>
      </form>
      {result !== null && (
        <Alert color="green" mt="md">
          {amount} {from} = {result.toFixed(4)} {to}
        </Alert>
      )}
    </Paper>
  );
};
