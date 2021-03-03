import { normalize } from 'polished';
import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components';
import { breakpoints, media } from './breakpoints';
import { anchorStyles, buttonStyles } from './component-styles';
import * as mixins from './mixins';

const palette = {
  red: '#e45b66',
  tan: '#e2c58c',
  transparent: 'transparent',
  white: '#ffffff',
  gray100: '#050000',
  gray200: '#0a0808',
  gray300: '#404040',
  gray400: '#646464',
  gray500: '#8e8e8e',
  gray600: '#aeaeae',
  gray700: '#d6d6d6',
  gray800: '#ebebeb',
  gray900: '#f2f2f2'
};

export const colors = {
  ...palette,
  primary: palette.gray200,
  onPrimary: palette.white,
  accent: palette.tan,
  onAccent: palette.gray200,
  background: palette.white,
  dark: palette.gray300,
  onDark: palette.white,
  darken: palette.gray800,
  onDarken: palette.gray100,
  textDark: palette.gray200,
  textDarker: palette.gray100,
  textLight: palette.white
};

export const borders = {
  card: `1px solid ${colors.gray800}`,
  control: `1px solid ${colors.gray700}`,
  controlActive: `2px solid ${colors.primary}`,
  thick: `8px solid ${colors.dark}`
};

export const fonts = {
  body:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  heading:
    'Roboto Condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
  button: 700,
  heading: 700,
  display: 700
};

export const lineHeights = {
  body: 1.89,
  control: 1.15,
  heading: 1.3
};

export const radii = {
  none: '0',
  sm: '4px',
  md: '8px'
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

export const shadows = {
  default: `0 2px 10px 0 rgba(0,0,0,0.13);`,
  nav: `0 1px 0 0 ${colors.gray800}`,
  none: 'none',
  outline: `0 0 0 2px ${colors.primary}`,
  thinOutline: `0 0 0 1px ${colors.gray700}`
};

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

export const zIndices = {
  lower: -1,
  higher: 1,
  dialog: 100,
  menu: 90
};

export const styles: GlobalStyleComponent<
  unknown,
  DefaultTheme
> = createGlobalStyle`
  ${normalize()}

  *, *::after, *::before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.textDark};
    margin: 0;
    padding: 0;
    ${textStyles.default}
  }

  p a:not([class]) {
    ${anchorStyles}
  }

  h1, h2, h3, h4, h5, h6 {
    ${textStyles.heading};
    margin: 0;

    > p:not([class]) {
      margin: 0;
    }
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

  label:not([class]){
    padding-bottom: ${space[2]};
  }

  input:not([class]) {
    border: ${borders.control};
    border-radius: ${radii.sm};
    display: block;
    outline: none;
    padding-bottom: ${space[2]};
    padding-left: ${space[3]};
    padding-right: ${space[3]};
    padding-top: ${space[2]};
    width: 100%;

    :focus {
      border-color: transparent;
      box-shadow: ${shadows.outline};
    }
  }

  code, pre {
    font-family: ${fonts.monospace};
  }
`;

export const components: any = {
  Button: buttonStyles
};

export { breakpoints, media, mixins };

export default {
  borders,
  breakpoints,
  colors,
  components,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  media,
  mixins,
  radii,
  shadows,
  sizes,
  space,
  styles,
  textStyles,
  zIndices
};
