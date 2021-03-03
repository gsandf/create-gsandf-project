import React from 'react';
import { Box } from '../components/common';
import BasicLayout from '../templates/Basic';

function About() {
  return (
    <BasicLayout title="Starter Theme | About">
      <Box as="header" $bgColor="accent" $color="onAccent" $p={6}>
        <h1>About</h1>
      </Box>
    </BasicLayout>
  );
}

export default About;
