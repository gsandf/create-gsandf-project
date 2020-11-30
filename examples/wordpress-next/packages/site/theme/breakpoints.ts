import { getValueAndUnit } from 'polished';
import { css, CSSProp } from 'styled-components';

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1440px'
};

export const createMinWidthQuery: any = (width: string) => (
  styles: CSSProp
) => css`
  @media (min-width: ${width}) {
    ${styles}
  }
`;

export const createMaxWidthQuery: any = (width: string) => (
  styles: CSSProp
) => {
  const [value, unit] = getValueAndUnit(width);

  return css`
    @media (max-width: ${value - 1}${unit}) {
      ${styles}
    }
  `;
};

export const media = {
  down: {
    sm: createMaxWidthQuery(breakpoints.sm),
    md: createMaxWidthQuery(breakpoints.md),
    lg: createMaxWidthQuery(breakpoints.lg),
    xl: createMaxWidthQuery(breakpoints.xl),
    xxl: createMaxWidthQuery(breakpoints.xxl)
  },
  up: {
    sm: createMinWidthQuery(breakpoints.sm),
    md: createMinWidthQuery(breakpoints.md),
    lg: createMinWidthQuery(breakpoints.lg),
    xl: createMinWidthQuery(breakpoints.xl),
    xxl: createMaxWidthQuery(breakpoints.xxl)
  }
};
