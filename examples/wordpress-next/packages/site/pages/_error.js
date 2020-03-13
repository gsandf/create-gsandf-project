import { getStatusText } from 'http-status-codes';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import BasicLayout from '../templates/Basic';

const Anchor = styled.a`
  background-color: white;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  padding: 1em;
  text-decoration: none;
`;

const Header = styled.header`
  align-items: center;
  background-color: ${p => p.theme.colors.primary};
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  margin-bottom: 2em;
  padding: 20px;
`;

function Error({ statusCode }) {
  return (
    <BasicLayout>
      <Header>
        <h1>
          {statusCode} | {getStatusText(statusCode)}
        </h1>

        <Link href="/">
          <Anchor>Go back home →</Anchor>
        </Link>
      </Header>
    </BasicLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
