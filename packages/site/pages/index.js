import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import BasicLayout from '../templates/Basic';
import { Container } from '../components/Base';

const Header = styled.header`
  align-items: center;
  background-color: ${p => p.theme.colors.primary};
  box-sizing: border-box;
  color: white;
  display: flex;
  height: 20vh;
  justify-content: center;
  margin-bottom: 2em;
  padding: 20px;
`;

function Home() {
  return (
    <BasicLayout>
      <Header>
        <Container>
          <h1>Welcome to a hackable WordPress theme</h1>
        </Container>
      </Header>

      <Container>
        <Link href="/about">
          <a>About -></a>
        </Link>
      </Container>
    </BasicLayout>
  );
}

export default Home;
