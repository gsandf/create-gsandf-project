import { Center } from '@gsandf/ui';
import styled from 'styled-components';

export const PostBox = styled(Center).attrs({ as: 'li' })<{
  background: string;
}>`
  background-image: linear-gradient(#0005 0, #0005 100%),
    url('${p => p.background}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  height: ${p => p.theme.sizes.lg};
  text-align: center;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: all 250ms ease;

  :hover {
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.02) translateY(-5px);
  }
`;
