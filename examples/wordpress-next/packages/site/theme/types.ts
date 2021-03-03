import React, { CSSProperties } from 'react';
import { DefaultTheme } from 'styled-components';

export type ResponsiveRule<T> = T | T[];
export type ThemeKey<K extends keyof DefaultTheme> = keyof DefaultTheme[K];

export interface BoxMixinProps {
  $display?: ResponsiveRule<CSSProperties['display']>;
  $position?: ResponsiveRule<CSSProperties['position']>;
}

export interface FlexChildProps {
  $alignSelf?: ResponsiveRule<CSSProperties['alignSelf']>;
  $basis?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['flexBasis']>;
  $flex?: ResponsiveRule<CSSProperties['flex']>;
  $grow?: ResponsiveRule<CSSProperties['flexGrow']>;
  $justifySelf?: ResponsiveRule<CSSProperties['justifySelf']>;
  $shrink?: ResponsiveRule<CSSProperties['flexShrink']>;
}

export interface FlexContainerProps {
  $alignItems?: ResponsiveRule<CSSProperties['alignItems']>;
  $justifyContent?: ResponsiveRule<CSSProperties['justifyContent']>;
  $direction?: ResponsiveRule<CSSProperties['flexDirection']>;
  $wrap?: ResponsiveRule<CSSProperties['flexWrap']>;
}

export interface ThemeBordersMixinProps {
  $border?: ResponsiveRule<ThemeKey<'borders'> | CSSProperties['border']>;
  $borderRadius?: ResponsiveRule<
    ThemeKey<'radii'> | CSSProperties['borderRadius']
  >;
}

export interface ThemeColorsMixinProps {
  $bg?: ResponsiveRule<ThemeKey<'colors'> | CSSProperties['background']>;
  $bgAttachment?: ResponsiveRule<CSSProperties['backgroundAttachment']>;
  $bgClip?: ResponsiveRule<CSSProperties['backgroundClip']>;
  $bgColor?: ResponsiveRule<
    ThemeKey<'colors'> | CSSProperties['backgroundColor']
  >;
  $bgImage?: ResponsiveRule<CSSProperties['backgroundImage']>;
  $bgOrigin?: ResponsiveRule<CSSProperties['backgroundOrigin']>;
  $bgPosition?: ResponsiveRule<CSSProperties['backgroundPosition']>;
  $bgRepeat?: ResponsiveRule<CSSProperties['backgroundRepeat']>;
  $bgSize?: ResponsiveRule<CSSProperties['backgroundSize']>;
  $color?: ResponsiveRule<ThemeKey<'colors'> | CSSProperties['color']>;
}

export interface ThemeFontsMixinProps {
  $font?: ResponsiveRule<ThemeKey<'fonts'> | CSSProperties['fontFamily']>;
  $fontSize?: ResponsiveRule<ThemeKey<'fontSizes'> | CSSProperties['fontSize']>;
  $fontStyle?: ResponsiveRule<CSSProperties['fontStyle']>;
  $fontWeight?: ResponsiveRule<
    ThemeKey<'fontWeights'> | CSSProperties['fontWeight']
  >;
  $lineHeight?: ResponsiveRule<
    ThemeKey<'lineHeights'> | CSSProperties['lineHeight']
  >;
  $textAlign?: ResponsiveRule<CSSProperties['textAlign']>;
  $textTransform?: ResponsiveRule<CSSProperties['textTransform']>;
}

export interface ThemeShadowsMixinProps {
  $shadow?: ResponsiveRule<ThemeKey<'shadows'> | CSSProperties['boxShadow']>;
  $textShadow?: ResponsiveRule<
    ThemeKey<'shadows'> | CSSProperties['textShadow']
  >;
}

export interface ThemeSizeMixinProps {
  $flexBasis?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['flexBasis']>;
  $height?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['height']>;
  $maxHeight?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['maxHeight']>;
  $maxWidth?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['maxWidth']>;
  $minHeight?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['minHeight']>;
  $minWidth?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['minWidth']>;
  $width?: ResponsiveRule<ThemeKey<'sizes'> | CSSProperties['width']>;
}

export interface ThemeSpaceMixinProps {
  $m?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['margin']>;
  $mb?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginBottom']>;
  $ml?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginLeft']>;
  $mr?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginRight']>;
  $mt?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginTop']>;
  $mx?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginLeft']>;
  $my?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['marginTop']>;
  $p?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['padding']>;
  $pb?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingBottom']>;
  $pl?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingLeft']>;
  $pr?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingRight']>;
  $pt?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingTop']>;
  $px?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingLeft']>;
  $py?: ResponsiveRule<ThemeKey<'space'> | CSSProperties['paddingTop']>;
}

export interface BaseComponentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface ThemeMixinProps
  extends BoxMixinProps,
    BaseComponentProps,
    FlexChildProps,
    FlexContainerProps,
    ThemeBordersMixinProps,
    ThemeColorsMixinProps,
    ThemeFontsMixinProps,
    ThemeShadowsMixinProps,
    ThemeSizeMixinProps,
    ThemeSpaceMixinProps {}
