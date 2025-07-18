import React, { useMemo, useState } from 'react';
import {
  Title,
  Group,
  NumberInput,
  Select,
  Button,
  Alert,
} from '@mantine/core';
import { useRatesData } from '../utils/ratesData';
import { QueryDataWrapper } from '../components/QueryDataWrapper';
import { StyledPaper } from '../components/StyledPaper';

export const CurrencyConverter: React.FC<{
  defaultFrom?: string;
  defaultTo?: string;
}> = ({ defaultFrom = 'CZK', defaultTo }) => {
  const { data, isLoading, error } = useRatesData();

  const currencyOptions = useMemo(() => {
    const allCodes = data
      ? Array.from(new Set(data.map((row) => row.Code)))
      : [];

    // Add CZK as the base currency
    return ['CZK', ...allCodes].map((code) => ({
      value: code,
      label: code,
    }));
  }, [data]);

  const [amount, setAmount] = useState<number | ''>('');
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo || '');
  const [result, setResult] = useState<number | null>(null);

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
      const fromRateObj = data.find((row) => row.Code === from);
      if (!fromRateObj) return;
      fromRate =
        parseFloat(fromRateObj.Rate.replace(',', '.')) /
        parseFloat(fromRateObj.Amount);
    }
    if (to !== 'CZK') {
      const toRateObj = data.find((row) => row.Code === to);
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
    <StyledPaper>
      <Title order={2} mb="md">
        Currency Converter
      </Title>
      <QueryDataWrapper isLoading={isLoading} error={error}>
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
          <Button
            type="submit"
            disabled={!amount || !from || !to || !Array.isArray(data)}
          >
            Convert
          </Button>
        </form>
        {result !== null && (
          <Alert color="green" mt="md">
            {amount} {from} = {result.toFixed(4)} {to}
          </Alert>
        )}
      </QueryDataWrapper>
    </StyledPaper>
  );
};
