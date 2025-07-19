import React from 'react';
import {
  AppShell,
  Group,
  Text,
  NavLink,
  ScrollArea,
  Burger,
} from '@mantine/core';
import { IconCurrencyDollar, IconExchange } from '@tabler/icons-react';
import { StyledAppShell } from './components/StyledAppShell';
import { useDisclosure } from '@mantine/hooks';

export type Section = 'rates' | 'converter';

export const Layout: React.FC<{
  children: React.ReactNode;
  section: Section;
  onSectionChange: (section: Section) => void;
}> = ({ children, section, onSectionChange }) => {
  const [mobileOpened, mobileDisclosure] = useDisclosure();
  const [desktopOpened, desktopDisclosure] = useDisclosure(true);

  const handleSectionChange = (newSection: Section) => {
    onSectionChange(newSection);
    mobileDisclosure.close();
  };

  return (
    <StyledAppShell
      header={{ height: 60 }}
      navbar={{
        width: 220,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <AppShell.Header px="md">
          <Group h="100%" px="sm" justify="flex-start">
            <Burger
              opened={mobileOpened}
              onClick={mobileDisclosure.toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={desktopDisclosure.toggle}
              visibleFrom="sm"
              size="sm"
            />

            <Text fw={700} size="lg">
              Currency Converter
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
              onClick={() => handleSectionChange('rates')}
            />
            <NavLink
              label="Currency Converter"
              leftSection={<IconExchange size={18} />}
              active={section === 'converter'}
              onClick={() => handleSectionChange('converter')}
            />
          </AppShell.Section>
        </AppShell.Navbar>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </StyledAppShell>
  );
};
