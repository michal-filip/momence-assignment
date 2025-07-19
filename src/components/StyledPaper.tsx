import styled from 'styled-components';
import { Paper } from '@mantine/core';

export const StyledPaper = styled(Paper).attrs({ p: 'md', withBorder: true })`
  flex: 1;
  overflow: auto;
`;
