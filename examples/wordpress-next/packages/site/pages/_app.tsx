import NextApp from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import signature from '../lib/signature';
import theme from '../theme';

export default class App extends NextApp {
  componentDidMount() {
    signature();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <theme.styles />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
