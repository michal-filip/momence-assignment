import React, { useState } from 'react';
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

const API_URL = 'http://localhost:3001/rates';

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

export const CurrencyConverter: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currency-rates'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch rates');
      const text = await res.text();
      return parseRates(text);
    },
  });

  const [amount, setAmount] = useState<number | ''>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const currencyOptions = data
    ? Array.from(new Set(data.map((row) => row.Code))).map((code) => ({
        value: code,
        label: code,
      }))
    : [];

  const handleConvert = () => {
    if (!data || !amount || !from || !to) return;
    const fromRateObj = data.find((row) => row.Code === from);
    const toRateObj = data.find((row) => row.Code === to);
    if (!fromRateObj || !toRateObj) return;
    // CNB rates are per Amount units of currency to CZK
    const fromRate =
      parseFloat(fromRateObj.Rate.replace(',', '.')) /
      parseFloat(fromRateObj.Amount);
    const toRate =
      parseFloat(toRateObj.Rate.replace(',', '.')) /
      parseFloat(toRateObj.Amount);
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
            onChange={setAmount}
            min={0}
            required
          />
          <Select
            label="From"
            data={currencyOptions}
            value={from}
            onChange={setFrom}
            required
            searchable
          />
          <Select
            label="To"
            data={currencyOptions}
            value={to}
            onChange={setTo}
            required
            searchable
          />
        </Group>
        <Button type="submit" disabled={!amount || !from || !to || !data}>
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
