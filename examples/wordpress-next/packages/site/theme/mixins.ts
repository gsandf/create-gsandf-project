import { css } from 'styled-components';
import { get, getOr } from 'unchanged';
import { media } from './breakpoints';

export * from './types';

const mediaQueries = Object.values(media.up);

function createRuleForProp(ruleName: string, themePath: string, prop: string) {
  function createRule(props: object): string {
    const propValue = get(prop, props);

    // Don't create any rules if no value was supplied
    if (!propValue) return '';

    // An array means create breakpoints
    if (Array.isArray(propValue)) {
      const [defaultStyle, ...otherStyles] = propValue;

      const breakpointStyles = otherStyles
        .map(style => createRule({ ...props, [prop]: style }))
        .flatMap((styles, index) => mediaQueries[index]([styles]))
        .join('');

      return `
        ${createRule({ ...props, [prop]: defaultStyle })}
        ${breakpointStyles}
      `;
    }

    // Try and get a value from the theme to apply. Otherwise, use the value
    // supplied directly.
    const value = getOr(propValue, `${themePath}.${propValue}`, props);

    return `${ruleName}: ${value};`;
  }

  return createRule;
}

export const flexChildMixin = css`
  ${createRuleForProp('align-self', '', '$alignSelf')}
  ${createRuleForProp('flex-basis', '', '$basis')}
  ${createRuleForProp('flex-grow', '', '$grow')}
  ${createRuleForProp('flex-shrink', '', '$shrink')}
  ${createRuleForProp('flex', '', '$flex')}
  ${createRuleForProp('justify-self', '', '$justifySelf')}
`;

export const flexContainerMixin = css`
  ${createRuleForProp('align-items', '', '$alignItems')}
  ${createRuleForProp('flex-direction', '', '$direction')}
  ${createRuleForProp('flex-direction', '', '$flexDirection')}
  ${createRuleForProp('flex-wrap', '', '$wrap')}
  ${createRuleForProp('justify-content', '', '$justifyContent')}
`;

export const themeBordersMixin = css`
  ${createRuleForProp('border-radius', 'theme.radii', '$borderRadius')}
`;

export const themeColorsMixin = css`
  ${createRuleForProp('background-color', 'theme.colors', '$bg')}
  ${createRuleForProp('color', 'theme.colors', '$color')}
`;

export const themeFontsMixin = css`
  ${createRuleForProp('font-family', 'theme.fonts', '$font')}
  ${createRuleForProp('font-size', 'theme.fontSizes', '$fontSize')}
  ${createRuleForProp('font-style', '', '$fontStyle')}
  ${createRuleForProp('font-weight', 'theme.fontWeights', '$fontWeight')}
  ${createRuleForProp('line-height', 'theme.lineHeights', '$lineHeight')}
  ${createRuleForProp('text-transform', '', '$textTransform')}
`;

export const themeShadowsMixin = css`
  ${createRuleForProp('box-shadow', 'theme.shadows', '$shadow')}
  ${createRuleForProp('text-shadow', 'theme.shadows', '$textShadow')}
`;

export const themeSizeMixin = css`
  ${createRuleForProp('flex-basis', 'theme.sizes', '$flexBasis')}
  ${createRuleForProp('height', 'theme.sizes', '$height')}
  ${createRuleForProp('max-height', 'theme.sizes', '$maxHeight')}
  ${createRuleForProp('max-width', 'theme.sizes', '$maxWidth')}
  ${createRuleForProp('min-height', 'theme.sizes', '$minHeight')}
  ${createRuleForProp('min-width', 'theme.sizes', '$minWidth')}
  ${createRuleForProp('width', 'theme.sizes', '$width')}
`;

export const themeSpaceMixin = css`
  ${createRuleForProp('margin-bottom', 'theme.space', '$mb')}
  ${createRuleForProp('margin-bottom', 'theme.space', '$my')}
  ${createRuleForProp('margin-left', 'theme.space', '$ml')}
  ${createRuleForProp('margin-left', 'theme.space', '$mx')}
  ${createRuleForProp('margin-right', 'theme.space', '$mr')}
  ${createRuleForProp('margin-right', 'theme.space', '$mx')}
  ${createRuleForProp('margin-top', 'theme.space', '$mt')}
  ${createRuleForProp('margin-top', 'theme.space', '$my')}
  ${createRuleForProp('margin', 'theme.space', '$m')}
  ${createRuleForProp('padding-bottom', 'theme.space', '$pb')}
  ${createRuleForProp('padding-bottom', 'theme.space', '$py')}
  ${createRuleForProp('padding-left', 'theme.space', '$pl')}
  ${createRuleForProp('padding-left', 'theme.space', '$px')}
  ${createRuleForProp('padding-right', 'theme.space', '$pr')}
  ${createRuleForProp('padding-right', 'theme.space', '$px')}
  ${createRuleForProp('padding-top', 'theme.space', '$pt')}
  ${createRuleForProp('padding-top', 'theme.space', '$py')}
  ${createRuleForProp('padding', 'theme.space', '$p')}
`;

export const themeMixin = css`
  ${flexChildMixin}
  ${flexContainerMixin}
  ${themeBordersMixin}
  ${themeColorsMixin}
  ${themeFontsMixin}
  ${themeShadowsMixin}
  ${themeSizeMixin}
  ${themeSpaceMixin}
`;
