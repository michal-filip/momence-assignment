import React from 'react';
import { useRatesData } from '../utils/ratesData';
import { Table, Title, Button, Group } from '@mantine/core';
import { QueryDataWrapper } from '../components/QueryDataWrapper';
import { StyledPaper } from '../components/StyledPaper';

export const CurrencyRates: React.FC<{
  onConvertFrom: (code: string) => void;
  onConvertTo: (code: string) => void;
}> = ({ onConvertFrom, onConvertTo }) => {
  const { data, isLoading, error } = useRatesData();

  return (
    <StyledPaper>
      <Title order={2} mb="md">
        Currency Rates
      </Title>
      <QueryDataWrapper isLoading={isLoading} error={error}>
        {!!data && (
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
              {data.map(({ Code, Country, Currency, Amount, Rate }, idx) => (
                <Table.Tr key={Code + idx}>
                  <Table.Td>{Country}</Table.Td>
                  <Table.Td>{Currency}</Table.Td>
                  <Table.Td>{Amount}</Table.Td>
                  <Table.Td>{Code}</Table.Td>
                  <Table.Td>{Rate}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => onConvertFrom(Code)}
                      >
                        convert from
                      </Button>
                      <Button
                        color="green"
                        size="xs"
                        onClick={() => onConvertTo(Code)}
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
      </QueryDataWrapper>
    </StyledPaper>
  );
};
