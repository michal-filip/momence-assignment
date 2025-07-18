import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  Loader,
  Alert,
  Paper,
  Title,
  Button,
  Group,
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

export const CurrencyRates: React.FC<{
  onConvertFrom: (code: string) => void;
  onConvertTo: (code: string) => void;
}> = ({ onConvertFrom, onConvertTo }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currency-rates'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch rates');
      const text = await res.text();
      return parseRates(text);
    },
  });

  return (
    <Paper p="md" withBorder style={{ flex: 1 }}>
      <Title order={2} mb="md">
        Currency Rates
      </Title>
      {isLoading && <Loader />}
      {!!error && (
        <Alert color="red">
          {error
            ? error instanceof Error
              ? error.message
              : String(error)
            : ''}
        </Alert>
      )}
      {data && (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Country</Table.Th>
              <Table.Th>Currency</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Code</Table.Th>
              <Table.Th>Rate</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((row, idx) => (
              <Table.Tr key={row.Code + idx}>
                <Table.Td>{row.Country}</Table.Td>
                <Table.Td>{row.Currency}</Table.Td>
                <Table.Td>{row.Amount}</Table.Td>
                <Table.Td>{row.Code}</Table.Td>
                <Table.Td>{row.Rate}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => onConvertFrom(row.Code)}
                    >
                      convert from
                    </Button>
                    <Button
                      color="green"
                      size="xs"
                      onClick={() => onConvertTo(row.Code)}
                    >
                      convert to
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );
};
