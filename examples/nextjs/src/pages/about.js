import { Button, Center, Container, Flex } from '@gsandf/ui';
import Link from 'next/link';
import React from 'react';
import { Header } from '../components/Demo';
import BasicLayout from '../templates/Basic';

export default function About() {
  return (
    <BasicLayout>
      <Flex
        as="header"
        $bgColor="darken"
        $direction="column"
        $justifyContent="center"
        $py={40}
      >
        <Container $px={8} $maxWidth={['full', '600px']}>
          <Header>This is an example About Page</Header>
        </Container>

        <Center $pt={24}>
          <Link href="/" passHref>
            <Button variant="dark">Go back home →</Button>
          </Link>
        </Center>
      </Flex>
    </BasicLayout>
  );
}
