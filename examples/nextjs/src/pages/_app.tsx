import NextApp from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import signature from '../utils/signature';

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
