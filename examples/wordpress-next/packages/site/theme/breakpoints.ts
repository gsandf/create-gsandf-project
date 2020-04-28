import { getValueAndUnit } from 'polished';
import { css, FlattenSimpleInterpolation } from 'styled-components';

export const breakpoints = {
  sm: '575px',
  md: '968px',
  lg: '1224px',
  xl: '1440px'
};

const createMinWidthQuery = (width: string) => (
  styles: FlattenSimpleInterpolation
) => css`
  @media (min-width: ${width}) {
    ${styles}
  }
`;

const createMaxWidthQuery = (width: string) => (
  styles: FlattenSimpleInterpolation
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
    xl: createMaxWidthQuery(breakpoints.xl)
  },
  up: {
    sm: createMinWidthQuery(breakpoints.sm),
    md: createMinWidthQuery(breakpoints.md),
    lg: createMinWidthQuery(breakpoints.lg),
    xl: createMinWidthQuery(breakpoints.xl)
  }
};
