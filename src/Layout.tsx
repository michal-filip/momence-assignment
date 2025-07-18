import React from 'react';
import {
  AppShell,
  Group,
  Text,
  NavLink,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { IconCurrencyDollar, IconExchange } from '@tabler/icons-react';

export type Section = 'rates' | 'converter';

export const Layout: React.FC<{
  children: React.ReactNode;
  section: Section;
  onSectionChange: (section: Section) => void;
}> = ({ children, section, onSectionChange }) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 220, breakpoint: 'sm', collapsed: { mobile: false } }}
      padding="md"
      bg={theme.colors.gray[0]}
    >
      <AppShell.Header>
        <AppShell.Header px="md">
          <Group h="100%" px="md" justify="space-between">
            <Text fw={700} size="lg">
              Momence Assignment
            </Text>
          </Group>
        </AppShell.Header>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Navbar p="md">
          <AppShell.Section grow component={ScrollArea}>
            <NavLink
              label="Currency Rates"
              leftSection={<IconCurrencyDollar size={18} />}
              active={section === 'rates'}
              onClick={() => onSectionChange('rates')}
            />
            <NavLink
              label="Currency Converter"
              leftSection={<IconExchange size={18} />}
              active={section === 'converter'}
              onClick={() => onSectionChange('converter')}
            />
          </AppShell.Section>
        </AppShell.Navbar>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
