export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440
};

const createMaxWidthQuery = (maxWidth: number, shouldSubtract = true) =>
  `@media (max-width: ${shouldSubtract ? maxWidth - 1 : maxWidth}px)`;

const createMinWidthQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

export const media = {
  down: (n: number) => createMaxWidthQuery(n, false),
  up: createMinWidthQuery,

  downSm: createMaxWidthQuery(breakpoints.sm),
  downMd: createMaxWidthQuery(breakpoints.md),
  downLg: createMaxWidthQuery(breakpoints.lg),
  downXl: createMaxWidthQuery(breakpoints.xl),
  downXxl: createMaxWidthQuery(breakpoints.xxl),

  upSm: createMinWidthQuery(breakpoints.sm),
  upMd: createMinWidthQuery(breakpoints.md),
  upLg: createMinWidthQuery(breakpoints.lg),
  upXl: createMinWidthQuery(breakpoints.xl),
  upXxl: createMinWidthQuery(breakpoints.xxl)
};
