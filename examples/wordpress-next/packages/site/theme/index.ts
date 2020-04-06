import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import * as mixins from './mixins';

const palette = {
  backgroundOrange: '#F26825',
  backgroundRed: '#EB3C35',
  black: '#111111',
  blueGrey: '#485660',
  darkGrey: '#727272',
  gold: '#EDB026',
  grey: '#505050',
  lightGrey: '#DCDCDC',
  midGrey: '#ABABAB',
  offWhite: '#F8F8F8',
  orange: '#e15f2c',
  red: '#E51B24',
  softBlack: '#242424',
  softGrey: '#f3f3f3',
  transparent: 'transparent',
  white: '#ffffff',
  yellow: '#e5ad2f'
};

export const colors = {
  ...palette,
  primary: palette.red,
  onPrimary: palette.white,
  secondary: palette.blueGrey,
  onSecondary: palette.white,
  accent: palette.yellow,
  onAccent: palette.softBlack,
  background: palette.white,
  dark: palette.blueGrey,
  onDark: palette.white,
  darken: palette.offWhite,
  textDark: palette.darkGrey,
  textLight: palette.white
};

export const fonts = {
  body:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  heading: 'inherit',
  monospace: 'IBM Plex Mono, Menlo, monospace'
};

export const fontSizes = [
  '0.64rem',
  '0.78rem',
  '1rem',
  '1.25rem',
  '1.333rem',
  '2rem',
  '2.667rem',
  '3.05rem',
  '3.815rem'
];

export const fontWeights = {
  body: 400,
  button: 900,
  heading: 700,
  display: 900
};

export const lineHeights = {
  body: 1.89,
  heading: 1.3
};

export const radii = {
  none: '0',
  sm: '2px',
  md: '6px'
};

export const shadows = {
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  none: 'none'
};

export const sizes = {
  '0': '0',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  xs: '2rem',
  sm: '4rem',
  md: '8rem',
  lg: '16rem',
  xl: '32rem',
  full: '100%',
  screenHeight: '100vh',
  screenWidth: '100vw'
};

export const space = [
  0,
  '0.25rem',
  '0.5rem',
  '1rem',
  '2rem',
  '4rem',
  '8rem',
  '16rem',
  '32rem'
];

export const textStyles = {
  default: {
    fontFamily: fonts.body,
    fontSize: fontSizes[2],
    fontWeight: fontWeights.body,
    lineHeight: lineHeights.body
  },
  heading: {
    fontFamily: fonts.heading,
    fontWeight: fontWeights.heading,
    lineHeight: lineHeights.heading
  }
};

export const styles = createGlobalStyle`
  ${normalize()}

  *, *::after, *::before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 18px;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.textDark};
    margin: 0;
    padding: 0;
    ${textStyles.default}
  }

  a:not([class]) {
    color: ${colors.accent};
    text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${textStyles.heading};
    margin: 0;
  }

  h1 {
    font-size: ${fontSizes[6]};
  }

  h2 {
    font-size: ${fontSizes[5]};
  }

  h3 {
    font-size: ${fontSizes[4]};
  }

  h4 {
    font-size: ${fontSizes[3]};
  }

  code, pre {
    font-family: ${fonts.monospace};
  }
`;

export const components = {};

export { mixins };

export default {
  colors,
  components,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  mixins,
  radii,
  shadows,
  sizes,
  space,
  styles,
  textStyles
};
