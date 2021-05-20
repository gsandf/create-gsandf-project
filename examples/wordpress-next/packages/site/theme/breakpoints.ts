export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440
};

const createMaxWidthQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const createMinWidthQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

export const media = {
  down: {
    from: createMaxWidthQuery,
    sm: createMaxWidthQuery(breakpoints.sm - 1),
    md: createMaxWidthQuery(breakpoints.md - 1),
    lg: createMaxWidthQuery(breakpoints.lg - 1),
    xl: createMaxWidthQuery(breakpoints.xl - 1),
    xxl: createMaxWidthQuery(breakpoints.xxl - 1)
  },

  up: {
    from: createMinWidthQuery,
    sm: createMinWidthQuery(breakpoints.sm),
    md: createMinWidthQuery(breakpoints.md),
    lg: createMinWidthQuery(breakpoints.lg),
    xl: createMinWidthQuery(breakpoints.xl),
    xxl: createMinWidthQuery(breakpoints.xxl)
  }
};
