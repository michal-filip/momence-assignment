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

const baseCurrency = 'CZK';

const formatOriginalAmount = (amount: number | undefined): string => {
  if (amount === undefined) {
    return '';
  }

  // We want to preserve the original precision
  return amount.toExponential().includes('e')
    ? amount.toFixed(10).replace(/\.?0+$/, '')
    : amount.toString();
};

export const CurrencyConverter: React.FC<{
  defaultFrom?: string;
  defaultTo?: string;
}> = ({ defaultFrom = baseCurrency, defaultTo = '' }) => {
  const { data: rates, isLoading, error } = useRatesData();

  const currencyOptions = useMemo(() => {
    const allCodes = rates?.map((row) => row.Code) || [];

    // Add the base currency
    return [baseCurrency, ...allCodes].map((code) => ({
      value: code,
      label: code,
    }));
  }, [rates]);

  const [amount, setAmount] = useState<number>();
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [result, setResult] = useState<number>();

  const disabled = !amount || !from || !to || !rates;

  const handleAmountChange = (val: string | number) => {
    setAmount(typeof val === 'number' ? val : undefined);
    setResult(undefined);
  };

  const handleFromChange = (val: string | null) => {
    setFrom(val || '');
    setResult(undefined);
  };

  const handleToChange = (val: string | null) => {
    setTo(val || '');
    setResult(undefined);
  };

  const handleConvert = () => {
    if (disabled) {
      return;
    }

    let fromRate = 1;
    let toRate = 1;

    if (from !== baseCurrency) {
      const fromRateObj = rates.find((row) => row.Code === from);
      if (!fromRateObj) return;
      fromRate =
        parseFloat(fromRateObj.Rate.replace(',', '.')) /
        parseFloat(fromRateObj.Amount);
    }
    if (to !== baseCurrency) {
      const toRateObj = rates.find((row) => row.Code === to);
      if (!toRateObj) return;
      toRate =
        parseFloat(toRateObj.Rate.replace(',', '.')) /
        parseFloat(toRateObj.Amount);
    }
    // Convert from -> baseCurrency -> to
    const converted = (amount * fromRate) / toRate;
    setResult(Number.isFinite(converted) ? converted : undefined);
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
              maxLength={10}
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
          <Button type="submit" disabled={disabled}>
            Convert
          </Button>
        </form>
        {result !== undefined && (
          <Alert color="green" mt="md">
            {formatOriginalAmount(amount)} {from} = {result.toFixed(4)} {to}
            {from !== baseCurrency &&
              to !== baseCurrency &&
              ` (conversion via ${baseCurrency})`}
          </Alert>
        )}
      </QueryDataWrapper>
    </StyledPaper>
  );
};
