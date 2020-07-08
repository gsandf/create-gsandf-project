import NextApp from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <theme.styles />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
