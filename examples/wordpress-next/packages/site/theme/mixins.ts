import { css } from 'styled-components';
import { get, getOr } from 'unchanged';

const createRuleForProp = (
  ruleName: string,
  themePath: string,
  prop: string
) => (props: object) => {
  const propValue = get(prop, props);

  if (propValue) {
    const value = getOr(propValue, `${themePath}.${propValue}`, props);
    return `${ruleName}: ${value};`;
  }
};

export interface ThemeBordersMixinProps {
  borderRadius?: string | number;
}

export const themeBordersMixin = css`
  ${createRuleForProp('border-radius', 'theme.radii', 'borderRadius')}
`;

export interface ThemeColorsMixinProps {
  bg?: string;
  color?: string;
}

export const themeColorsMixin = css`
  ${createRuleForProp('background-color', 'theme.colors', 'bg')}
  ${createRuleForProp('color', 'theme.colors', 'color')}
`;

export interface ThemeFontsMixinProps {
  font?: string;
  fontSize?: string;
  fontWeight?: number | string;
  lineHeight?: number | string;
}

export const themeFontsMixin = css`
  ${createRuleForProp('font-family', 'theme.fonts', 'font')}
  ${createRuleForProp('font-size', 'theme.fontSizes', 'fontSize')}
  ${createRuleForProp('font-weight', 'theme.fontWeights', 'fontWeight')}
  ${createRuleForProp('line-height', 'theme.lineHeights', 'lineHeight')}
`;

export interface ThemeShadowsMixinProps {
  shadow?: string;
}

export const themeShadowsMixin = css`
  ${createRuleForProp('box-shadow', 'theme.shadows', 'shadow')}
`;

export interface ThemeSizeMixinProps {
  flexBasis?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  width?: number | string;
}

export const themeSizeMixin = css`
  ${createRuleForProp('flex-basis', 'theme.sizes', 'flexBasis')}
  ${createRuleForProp('height', 'theme.sizes', 'height')}
  ${createRuleForProp('max-height', 'theme.sizes', 'maxHeight')}
  ${createRuleForProp('max-width', 'theme.sizes', 'maxWidth')}
  ${createRuleForProp('min-height', 'theme.sizes', 'minHeight')}
  ${createRuleForProp('min-width', 'theme.sizes', 'minWidth')}
  ${createRuleForProp('width', 'theme.sizes', 'width')}
`;

export interface ThemeSpaceMixinProps {
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mt?: number | string;
  mx?: number | string;
  my?: number | string;
  m?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  pt?: number | string;
  px?: number | string;
  py?: number | string;
  p?: number | string;
}

export const themeSpaceMixin = css`
  ${createRuleForProp('margin-bottom', 'theme.space', 'mb')}
  ${createRuleForProp('margin-left', 'theme.space', 'ml')}
  ${createRuleForProp('margin-right', 'theme.space', 'mr')}
  ${createRuleForProp('margin-top', 'theme.space', 'mt')}
  ${createRuleForProp('margin-left', 'theme.space', 'mx')}
  ${createRuleForProp('margin-right', 'theme.space', 'mx')}
  ${createRuleForProp('margin-bottom', 'theme.space', 'my')}
  ${createRuleForProp('margin-top', 'theme.space', 'my')}
  ${createRuleForProp('margin', 'theme.space', 'm')}
  ${createRuleForProp('padding-bottom', 'theme.space', 'pb')}
  ${createRuleForProp('padding-left', 'theme.space', 'pl')}
  ${createRuleForProp('padding-right', 'theme.space', 'pr')}
  ${createRuleForProp('padding-top', 'theme.space', 'pt')}
  ${createRuleForProp('padding-left', 'theme.space', 'px')}
  ${createRuleForProp('padding-right', 'theme.space', 'px')}
  ${createRuleForProp('padding-bottom', 'theme.space', 'py')}
  ${createRuleForProp('padding-top', 'theme.space', 'py')}
  ${createRuleForProp('padding', 'theme.space', 'p')}
`;

export type ThemeMixinProps = ThemeBordersMixinProps &
  ThemeColorsMixinProps &
  ThemeFontsMixinProps &
  ThemeShadowsMixinProps &
  ThemeSizeMixinProps &
  ThemeSpaceMixinProps;

export const themeMixin = css`
  ${themeBordersMixin}
  ${themeColorsMixin}
  ${themeFontsMixin}
  ${themeShadowsMixin}
  ${themeSizeMixin}
  ${themeSpaceMixin}
`;
