import React, { SuspenseProps } from 'react';
import { isServer } from '../lib/render-environment';

function NoServerRender(props: Partial<SuspenseProps>) {
  if (isServer) return null;

  return <React.Suspense fallback={null} {...props} />;
}

export default NoServerRender;
