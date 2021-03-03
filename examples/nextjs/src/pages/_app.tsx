import signature from 'lib/signature';
import NextApp from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/index';

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
