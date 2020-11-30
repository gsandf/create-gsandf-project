import { transparentize } from 'polished';
import { css, CSSProp } from 'styled-components';

export const anchorStyles = css`
  color: ${p => p.theme.colors.primary};
  text-decoration: underline;

  :hover {
    text-decoration: none;
  }
` as CSSProp;

export const buttonStyles = css`
  background-color: ${p => p.theme.colors.primary};
  border: 4px solid ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.onPrimary};
  cursor: default;
  display: inline-block;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontWeights.button};
  letter-spacing: 1.45px;
  line-height: ${p => p.theme.lineHeights.control};
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[3]};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 200ms ease, color 200ms ease;
  user-select: none;

  :hover {
    background-color: transparent;
    color: ${p => p.theme.colors.primary};
  }

  :active,
  :focus,
  :focus-within {
    background-color: ${p => transparentize(0.5, p.theme.colors.primary)};
    color: ${p => p.theme.colors.primary};
    outline: none;
  }

  ${p =>
    p.theme.media.up.sm(css`
      padding: ${p.theme.space[3]} ${p.theme.space[4]};
    `)}
` as CSSProp;
