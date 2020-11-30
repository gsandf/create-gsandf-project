import React from 'react';
import Error from './_error';

export default function MissingPage() {
  return <Error statusCode={404} />;
}
