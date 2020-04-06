import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '../components/common';
import BasicLayout from '../templates/Basic';

const Header = styled.h1`
  background-color: ${p => p.theme.colors.secondary};
  box-shadow: 0.5em 0 0 ${p => p.theme.colors.secondary},
    -0.5em 0 0 ${p => p.theme.colors.secondary};
  color: ${p => p.theme.colors.onSecondary};
  display: inline;
  text-transform: uppercase;
  ${p => p.theme.mixins.themeMixin}
`;

function Home() {
  return (
    <BasicLayout>
      <Box as="header" bg="darken" p={5}>
        <Flex justifyContent="center">
          <Box width="3/4">
            <Header>Welcome to a hackable WordPress theme</Header>
          </Box>
        </Flex>
      </Box>

      <Box p={4}>
        <p>
          Next.js will serve each file in <code>`/pages`</code> under a pathname
          matching the filename. For example, <code>`/pages/about.js`</code> is
          served at{' '}
          <Link href="/about">
            <a>localhost:3000/about</a>
          </Link>
          .
        </p>
      </Box>
    </BasicLayout>
  );
}

export default Home;
