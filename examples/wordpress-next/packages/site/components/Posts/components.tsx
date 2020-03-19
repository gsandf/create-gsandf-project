import styled from 'styled-components';

export const PostList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  row-gap: 1em;
`;

export const Box = styled.li<{ background: string }>`
  background-image: url(${p => p.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid lightgray;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(50% - 2em);
  font-size: 2em;
  font-weight: bold;
  height: 150px;
  margin: 0.5em;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  a {
    color: inherit;
    flex: 1;
    padding: 0.5em;
    text-decoration: none;
    display: block;
  }

  img {
    flex: 1;
    display: block;
  }
`;
