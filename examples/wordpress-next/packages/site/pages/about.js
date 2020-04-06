import React from 'react';
import { Box } from '../components/common';
import BasicLayout from '../templates/Basic';

function About() {
  return (
    <BasicLayout>
      <Box as="header" bg="dark" color="onDark" p={6}>
        <h1>About</h1>
      </Box>
    </BasicLayout>
  );
}

export default About;
