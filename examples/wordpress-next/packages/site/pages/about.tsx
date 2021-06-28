import { Box, Container, Text } from '@gsandf/ui';
import React from 'react';
import BasicLayout from '../templates/Basic';

function About() {
  return (
    <BasicLayout title="GS&amp;F Starter Theme | About">
      <Box as="header" $bgColor="primary" $color="onPrimary" $py={28}>
        <Container $px={4}>
          <h1>About</h1>
        </Container>
      </Box>

      <Container $px={4} $py={16}>
        <Text>
          This is an example About page. Feel free to modify it or delete it
          altogether.
        </Text>
      </Container>
    </BasicLayout>
  );
}

export default About;
