import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Box, Container, Flex, Text } from '../components/common';
import BasicLayout from '../templates/Basic';

const Card = styled.a`
  border-color: ${p => p.theme.colors.gray700};
  border-radius: ${p => p.theme.radii.md};
  border-style: solid;
  border-width: 1px;
  color: inherit;
  flex: 1 0 100%;
  margin: ${p => p.theme.space[3]};
  padding: ${p => p.theme.space[3]};
  text-decoration: none;
  transition: all 250ms ease;

  :hover,
  :focus,
  :active {
    background-color: ${p => p.theme.colors.accent};
    border-color: ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors.onAccent};
  }

  ${p => p.theme.media.up.sm} {
    flex-basis: 45%;
  }
`;

const Header = styled.h1`
  background-color: ${p => p.theme.colors.accent};
  box-shadow: 0.5em 0 0 ${p => p.theme.colors.accent},
    -0.5em 0 0 ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.onAccent};
  display: inline;
  text-transform: uppercase;
  ${p => p.theme.mixins.themeMixin}
`;

export default function Home(): JSX.Element {
  return (
    <BasicLayout
      keywords={['example', 'site', 'GS&F']}
      metaDescription="Welcome to a hackable WordPress theme"
      title="Starter Theme | Home"
    >
      <Head>
        <title>GS&amp;F Vanilla Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="header" $justifyContent="center" $bg="darken" $py={6}>
        <Box $px={[4, 5]} $maxWidth={['full', '600px']}>
          <Header>Welcome to a hackable site starter</Header>
        </Box>
      </Flex>

      <Container $px={2} $py={4}>
        <p>
          Next.js will serve each file in <code>/pages</code> under a pathname
          matching the filename. For example making a file at{' '}
          <code>/pages/about.tsx</code> would be served at{' '}
          <Link href="/about">
            <a>localhost:3000/about</a>
          </Link>
          .
        </p>
      </Container>

      <Container $px={2} $py={4}>
        <Flex $justifyContent="center" $wrap="wrap">
          <Card href="https://nextjs.org/docs">
            <Text as="h3">Documentation &rarr;</Text>
            <Text as="p">
              Find in-depth information about Next.js features and API.
            </Text>
          </Card>

          <Card href="https://nextjs.org/learn">
            <Text as="h3">Learn &rarr;</Text>
            <Text as="p">
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Card>

          <Card href="https://github.com/vercel/next.js/tree/master/examples">
            <Text as="h3">Examples &rarr;</Text>
            <Text as="p">
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Card>

          <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <Text as="h3">Deploy &rarr;</Text>
            <Text as="p">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Card>
        </Flex>
      </Container>
    </BasicLayout>
  );
}
