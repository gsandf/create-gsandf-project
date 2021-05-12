import React from 'react';
import styled from 'styled-components';
import { media, textStyles } from '../theme';
import { ThemeMixinProps } from '../theme/mixins';

export const Box = styled.div<ThemeMixinProps>`
  display: block;
  flex-grow: 0;
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

export const Container = styled(Flex)<ThemeMixinProps & { $maxWidth?: string }>`
  margin: 0 auto;
  max-width: ${p => p.$maxWidth ?? p.theme.breakpoints.xl};
  ${p => p.theme.mixins.themeMixin}
`;

export const Inner = styled.div<ThemeMixinProps & { $maxWidth?: string }>`
  display: flex;
  margin: 0 auto;
  max-width: ${p => p.$maxWidth ?? p.theme.breakpoints.xl};
  padding: 0 20px;
  ${p => p.theme.mixins.themeMixin}

  ${media.upMd} {
    padding: 0 ${p => p.theme.space[4]};
  }

  ${media.upXl} {
    padding: ${p => p.theme.space[5]} 0;
    max-width: ${p => p.theme.breakpoints.xl};
  }
`;

export const Text = styled.span<
  ThemeMixinProps & { $textStyles?: keyof typeof textStyles }
>`
  ${p => p.$textStyles && p.theme.textStyles[p.$textStyles]}
  ${p => p.theme.mixins.themeMixin}
`;

export const MailTo = ({ children }: { children: string }) => (
  <a href={`mailto:${children}`}>{children}</a>
);
