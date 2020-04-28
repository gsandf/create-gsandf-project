export type CommonCSSValues = 'inherit' | 'initial' | 'unset';

export type BreakpointNumber = number | number[];
export type BreakpointString = string | string[];
export type BreakpointRule = BreakpointNumber | BreakpointString;

export type CommonFlexRules =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'normal'
  | 'safe center'
  | 'start'
  | 'stretch'
  | 'unsafe center'
  | CommonCSSValues;

export type FlexAlignment =
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | CommonFlexRules
  | FlexAlignment[];

export type FlexDirection =
  | 'column-reverse'
  | 'column'
  | 'row-reverse'
  | 'row'
  | CommonCSSValues
  | FlexDirection[];

export type FlexJustification =
  | 'left'
  | 'right'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | CommonFlexRules
  | FlexJustification[];

export type FlexWrap =
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  | CommonCSSValues
  | FlexWrap[];

export interface FlexChildProps {
  $alignSelf?: CommonFlexRules;
  $basis?: BreakpointString;
  $grow?: BreakpointRule;
  $justifySelf?: CommonFlexRules;
  $shrink?: BreakpointRule;
}

export interface FlexContainerProps {
  $alignItems?: FlexAlignment;

  $justifyContent?: FlexJustification;

  $direction?: FlexDirection;

  $wrap?: FlexWrap;
}

export interface ThemeBordersMixinProps {
  $borderRadius?: BreakpointRule;
}

export interface ThemeColorsMixinProps {
  $bg?: BreakpointString;
  $color?: BreakpointString;
}

export interface ThemeFontsMixinProps {
  $font?: BreakpointString;
  $fontSize?: BreakpointString;
  $fontStyle?: BreakpointString;
  $fontWeight?: BreakpointRule;
  $lineHeight?: BreakpointRule;
  $textTransform?: BreakpointString;
}

export interface ThemeShadowsMixinProps {
  $shadow?: BreakpointString;
  $textShadow?: BreakpointString;
}

export interface ThemeSizeMixinProps {
  $flexBasis?: BreakpointRule;
  $height?: BreakpointRule;
  $maxHeight?: BreakpointRule;
  $maxWidth?: BreakpointRule;
  $minHeight?: BreakpointRule;
  $minWidth?: BreakpointRule;
  $width?: BreakpointRule;
}

export interface ThemeSpaceMixinProps {
  $m?: BreakpointRule;
  $mb?: BreakpointRule;
  $ml?: BreakpointRule;
  $mr?: BreakpointRule;
  $mt?: BreakpointRule;
  $mx?: BreakpointRule;
  $my?: BreakpointRule;
  $p?: BreakpointRule;
  $pb?: BreakpointRule;
  $pl?: BreakpointRule;
  $pr?: BreakpointRule;
  $pt?: BreakpointRule;
  $px?: BreakpointRule;
  $py?: BreakpointRule;
}

export type ThemeMixinProps = FlexChildProps &
  FlexContainerProps &
  ThemeBordersMixinProps &
  ThemeColorsMixinProps &
  ThemeFontsMixinProps &
  ThemeShadowsMixinProps &
  ThemeSizeMixinProps &
  ThemeSpaceMixinProps;
