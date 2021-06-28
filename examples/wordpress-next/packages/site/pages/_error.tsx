import { Box, Button, Flex, Text } from '@gsandf/ui';
import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import BasicLayout from '../templates/Basic';

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
} as const;

function Error({ statusCode }: ErrorProps) {
  const reasonText =
    statusCodes[statusCode] ?? 'An unexpected error has occurred';

  return (
    <BasicLayout
      metaDescription=""
      title={`${statusCode} Error - ${reasonText}`}
    >
      <Flex
        $alignItems="center"
        $direction="column"
        $minHeight="70vh"
        $justifyContent="center"
        $py={7}
      >
        <Text as="h1" $textAlign="center">
          {reasonText}
        </Text>

        <Box $height="2em" />

        <Link href="/" passHref>
          <Button>Go back home →</Button>
        </Link>
      </Flex>
    </BasicLayout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

interface ErrorProps {
  statusCode: number;
}

export default Error;
