async function redirects() {
  // - `source` is the incoming request path pattern
  // - `destination` is the path you want to route to
  // - `permanent` if the redirect is permanent or not
  return [
    {
      source: '/example-source',
      destination: '/where-to-go-instead',
      permanent: false
    }
  ];
}

module.exports = {
  reactStrictMode: true,
  redirects,
  target: 'server',
  trailingSlash: false
};
