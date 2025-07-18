import React from 'react';
import {
  AppShell,
  Group,
  Text,
  NavLink,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { IconCurrencyDollar, IconHome } from '@tabler/icons-react';

const navLinks = [
  {
    label: 'Currency Rates',
    icon: <IconCurrencyDollar size={18} />,
    link: '#',
  },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
            {/* Add user/profile/actions here if needed */}
          </Group>
        </AppShell.Header>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Navbar p="md">
          <AppShell.Section grow component={ScrollArea}>
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                leftSection={item.icon}
                href={item.link}
              />
            ))}
          </AppShell.Section>
        </AppShell.Navbar>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
