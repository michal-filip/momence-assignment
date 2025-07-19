import { createContext, useContext } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { parseRates } from './parseRates';

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
