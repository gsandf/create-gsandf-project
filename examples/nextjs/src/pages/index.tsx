import { BasicGrid, Box, Container, Flex, Text } from '@gsandf/ui';
import Link from 'next/link';
import React from 'react';
import { Card, Header } from '../components/Demo';
import BasicLayout from '../templates/Basic';

export default function Home(): JSX.Element {
  return (
    <BasicLayout
      keywords={['example', 'site', 'GS&F']}
      metaDescription="Welcome to a hackable site starter"
      title="GS&amp;F Site Starter | Home"
    >
      <Flex as="header" $justifyContent="center" $bgColor="darken" $py={40}>
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
            <a>/about</a>
          </Link>
          .
        </p>
      </Container>

      <Container $px={2} $py={4}>
        <BasicGrid columns={[1, , 2]} spacing={4}>
          <Card as="a" href="https://nextjs.org/docs">
            <Text as="h3">Documentation &rarr;</Text>
            <Text as="p">
              Find in-depth information about Next.js features and API.
            </Text>
          </Card>

          <Card as="a" href="https://nextjs.org/learn">
            <Text as="h3">Learn &rarr;</Text>
            <Text as="p">
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Card>

          <Card
            as="a"
            href="https://github.com/vercel/next.js/tree/master/examples"
          >
            <Text as="h3">Examples &rarr;</Text>
            <Text as="p">
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Card>

          <Card
            as="a"
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <Text as="h3">Deploy &rarr;</Text>
            <Text as="p">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Card>
        </BasicGrid>
      </Container>
    </BasicLayout>
  );
}
