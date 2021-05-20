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
  customDown: createMaxWidthQuery,
  customUp: createMinWidthQuery,

  downSm: createMaxWidthQuery(breakpoints.sm - 1),
  downMd: createMaxWidthQuery(breakpoints.md - 1),
  downLg: createMaxWidthQuery(breakpoints.lg - 1),
  downXl: createMaxWidthQuery(breakpoints.xl - 1),
  downXxl: createMaxWidthQuery(breakpoints.xxl - 1),

  upSm: createMinWidthQuery(breakpoints.sm),
  upMd: createMinWidthQuery(breakpoints.md),
  upLg: createMinWidthQuery(breakpoints.lg),
  upXl: createMinWidthQuery(breakpoints.xl),
  upXxl: createMinWidthQuery(breakpoints.xxl)
};
