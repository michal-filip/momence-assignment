import React from 'react';
import { useRatesData } from '../utils/ratesData';
import { Table, Title, Button, Group, VisuallyHidden } from '@mantine/core';
import { QueryDataWrapper } from '../components/QueryDataWrapper';
import { StyledPaper } from '../components/StyledPaper';
import { useFavorites } from '../utils/useFavorites';
import { IconStar } from '@tabler/icons-react';

export const CurrencyRates: React.FC<{
  onConvertFrom: (code: string) => void;
  onConvertTo: (code: string) => void;
}> = ({ onConvertFrom, onConvertTo }) => {
  const { data, isLoading, error } = useRatesData();
  const { addFavorite, removeFavorite, isFavorite, sortWithFavorites } =
    useFavorites();

  const sortedData = data ? sortWithFavorites(data, (item) => item.Code) : [];

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
                <Table.Th>
                  <Group gap="xs" align="center">
                    <IconStar size={16} color="#f5c518" />
                    <VisuallyHidden>Favorite</VisuallyHidden>
                  </Group>
                </Table.Th>
                <Table.Th>Country</Table.Th>
                <Table.Th>Currency</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>Rate</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedData.map(
                ({ Code, Country, Currency, Amount, Rate }, idx) => (
                  <Table.Tr key={Code + idx}>
                    <Table.Td>
                      <input
                        type="checkbox"
                        checked={isFavorite(Code)}
                        onChange={(e) => {
                          if (e.target.checked) addFavorite(Code);
                          else removeFavorite(Code);
                        }}
                        aria-label={
                          isFavorite(Code)
                            ? 'Unmark as favorite'
                            : 'Mark as favorite'
                        }
                      />
                    </Table.Td>
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
                ),
              )}
            </Table.Tbody>
          </Table>
        )}
      </QueryDataWrapper>
    </StyledPaper>
  );
};
