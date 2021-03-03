import Head from 'next/head';
import React from 'react';
import Nav from '../components/Nav';
import { absoluteURL } from '../lib/absolute-url';

export interface BasicTemplateProps {
  children: JSX.Element | JSX.Element[];
  keywords?: string[];
  metaDescription?: string;
  socialMediaImage?: string;
  title?: string;
}

function Basic({
  children,
  keywords = [],
  metaDescription,
  socialMediaImage = absoluteURL('/android-chrome-512x512.png'),
  title
}: BasicTemplateProps): JSX.Element {
  const metaKeywords = Array.isArray(keywords) ? keywords.join(',') : '';

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>

        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={socialMediaImage} />
      </Head>

      <Nav />

      <main>{children}</main>
    </>
  );
}

export default Basic;
