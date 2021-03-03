import styled from 'styled-components';
import { Box } from '../common';

export const PostList = styled.ul`
  display: grid;
  gap: ${p => p.theme.space[2]};
  grid-template-columns: repeat(1, 1fr);
  list-style: none;
  margin: 0;
  padding: ${p => p.theme.space[2]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PostBox = styled(Box).attrs({ as: 'li' })<{ background: string }>`
  background-image: linear-gradient(#0005 0, #0005 100%),
    url('${p => p.background}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  font-size: ${p => p.theme.fontSizes[3]};
  font-weight: bold;
  height: ${p => p.theme.sizes.md};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: box-shadow 300ms ease;

  a {
    color: inherit;
    display: block;
    flex: 1;
    padding: ${p => p.theme.space[3]};
    text-decoration: none;
  }

  :hover {
    box-shadow: ${p => p.theme.shadows.outline};
  }
`;
