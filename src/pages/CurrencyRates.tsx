import React from 'react';
import { useRatesData } from './CurrencyConverter';
import {
  Table,
  Loader,
  Alert,
  Paper,
  Title,
  Button,
  Group,
} from '@mantine/core';

export const CurrencyRates: React.FC<{
  onConvertFrom: (code: string) => void;
  onConvertTo: (code: string) => void;
}> = ({ onConvertFrom, onConvertTo }) => {
  const { data, isLoading, error } = useRatesData();

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
