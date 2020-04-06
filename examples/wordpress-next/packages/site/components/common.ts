import styled from 'styled-components';
import { ThemeMixinProps } from '../theme/mixins';

export const Box = styled.div<FlexChildProps & ThemeMixinProps>`
  display: block;
  flex: 1;
  flex-basis: ${p => p.basis || 'auto'};
  flex-grow: ${p => p.grow || 0};
  flex-shrink: ${p => p.shrink || 1};
  margin: 0;
  min-width: 0;
  ${p => p.theme.mixins.themeMixin}
`;

export const Container = styled(Box)<ThemeMixinProps>`
  margin: 0 auto;
  max-width: 1240px;
  padding: ${p => p.theme.space[2]};
  ${p => p.theme.mixins.themeMixin}
`;

export const Flex = styled(Box)<FlexContainerProps & ThemeMixinProps>`
  align-items: ${p => p.alignItems || 'flex-start'};
  display: flex;
  flex-direction: ${p => p.direction || 'row'};
  flex-wrap: ${p => (p.wrap ? 'wrap' : 'nowrap')};
  justify-content: ${p => p.justifyContent || 'flex-start'};
  ${p => p.theme.mixins.themeMixin}
`;

export interface FlexChildProps {
  basis?: string;
  grow?: number | string;
  shrink?: number | string;
}

export type CommonCSSValues = 'inherit' | 'initial' | 'unset';

export interface FlexContainerProps {
  alignItems?:
    | 'baseline'
    | 'center'
    | 'end'
    | 'first baseline'
    | 'flex-end'
    | 'flex-start'
    | 'last baseline'
    | 'normal'
    | 'safe center'
    | 'start'
    | 'stretch'
    | 'unsafe center'
    | CommonCSSValues;

  justifyContent?:
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'left'
    | 'normal'
    | 'right'
    | 'safe center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'stretch'
    | 'unsafe center'
    | CommonCSSValues;

  direction?:
    | 'column-reverse'
    | 'column'
    | 'row-reverse'
    | 'row'
    | CommonCSSValues;

  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | CommonCSSValues;
}
