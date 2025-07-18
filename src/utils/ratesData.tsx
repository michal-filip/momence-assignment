import { createContext, useContext } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function parseRates(data: string) {
  // The rates are in a text format, skip header lines and parse the table
  const lines = data.split('\n').filter(Boolean);
  const startIdx = lines.findIndex((line) => line.startsWith('Country|'));
  if (startIdx === -1) {
    return [];
  }

  const headers = lines[startIdx].split('|');

  return lines.slice(startIdx + 1).map((line) => {
    const values = line.split('|');
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i]));

    return obj;
  });
}

export const RatesDataContext = createContext<
  UseQueryResult<Record<string, string>[]> | undefined
>(undefined);

export const RatesDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const query = useQuery({
    queryKey: ['currency-rates'],
    queryFn: async () => {
      const res = await fetch('/rates');
      if (!res.ok) {
        throw new Error('Failed to fetch rates');
      }

      const text = await res.text();
      return parseRates(text);
    },
  });

  return (
    <RatesDataContext.Provider value={query}>
      {children}
    </RatesDataContext.Provider>
  );
};

export function useRatesData() {
  const ctx = useContext(RatesDataContext);
  if (!ctx) {
    throw new Error('useRatesData must be used within RatesDataProvider');
  }

  return ctx;
}
