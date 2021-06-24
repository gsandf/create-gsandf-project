import { transparentize } from 'polished';
import { css, CSSProp } from 'styled-components';

export type ButtonVariant = 'control' | 'dark';

export const baseButtonStyles = css<{ variant?: ButtonVariant }>`
  align-items: center;
  background-color: ${p => p.theme.colors.background};
  border-color: ${p => p.theme.colors.dark};
  border-radius: ${p => p.theme.radii.sm};
  border-style: solid;
  border-width: 1px;
  color: ${p => p.theme.colors.textDark};
  cursor: default;
  display: inline-flex;
  flex-shrink: 0;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontWeights.control};
  justify-content: center;
  letter-spacing: 1.45px;
  line-height: ${p => p.theme.lineHeights.control};
  padding: ${p => p.theme.space[3]} ${p => p.theme.space[4]};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 200ms ease, color 200ms ease;
  user-select: none;

  :hover {
    background-color: ${p => p.theme.colors.darken};
    color: ${p => p.theme.colors.onDarken};
  }

  :active,
  :focus,
  :focus-within {
    background-color: ${p => transparentize(0.5, p.theme.colors.primary)};
    color: ${p => p.theme.colors.primary};
    outline: none;
  }
` as CSSProp;

export const buttonVariantControl = css`
  background-color: transparent;
  border-color: transparent;
  font-size: 0.875em;
  padding: 0.625em 1em;

  :active,
  :focus {
    background-color: ${p => p.theme.colors.darken};
    color: ${p => p.theme.colors.onDarken};
  }

  ${p => p.theme.media.up.sm} {
    font-size: 1em;
    padding: 0.625em 1em;
  }
`;

export const buttonVariantDark = css`
  background-color: ${p => p.theme.colors.dark};
  border-color: ${p => p.theme.colors.dark};
  color: ${p => p.theme.colors.onDark};

  :hover {
    background-color: ${p => p.theme.colors.gray400};
    border-color: ${p => p.theme.colors.gray400};
    color: ${p => p.theme.colors.onDark};
  }
`;
