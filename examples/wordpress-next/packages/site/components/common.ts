import styled from 'styled-components';
import { ThemeMixinProps } from '../theme/mixins';

export const Box = styled.div<ThemeMixinProps>`
  display: block;
  flex: 1;
  margin: 0;
  min-width: 0;
  ${p => p.theme.mixins.themeMixin}
`;

export const Button = styled.button<ThemeMixinProps>`
  ${p => p.theme.components.Button}
  ${p => p.theme.mixins.themeMixin}
`;

export const Flex = styled(Box)<ThemeMixinProps>`
  display: flex;
  ${p => p.theme.mixins.themeMixin}
`;

export const Container = styled(Flex)<ThemeMixinProps>`
  display: block;
  margin: 0 auto;
  max-width: ${p => p.theme.breakpoints.xl};
  ${p => p.theme.mixins.themeMixin}
`;

export const Text = styled.span<ThemeMixinProps>`
  ${p => p.theme.mixins.themeMixin}
`;
