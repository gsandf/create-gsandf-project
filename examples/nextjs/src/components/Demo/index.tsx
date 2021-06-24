import { Stack } from '@gsandf/ui';
import styled from 'styled-components';

export const Card = styled(Stack)`
  border-color: ${p => p.theme.colors.gray700};
  border-radius: ${p => p.theme.radii.md};
  border-style: solid;
  border-width: 1px;
  color: inherit;
  padding: ${p => p.theme.space[5]};
  text-decoration: none;
  transition: all 250ms ease;

  :hover,
  :focus,
  :active {
    background-color: ${p => p.theme.colors.primary};
    border-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.onPrimary};
  }
`;

export const Header = styled.h1`
  background-color: ${p => p.theme.colors.primary};
  box-shadow: 0.5em 0 0 ${p => p.theme.colors.primary},
    -0.5em 0 0 ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.onPrimary};
  display: inline;
  text-transform: uppercase;
`;
