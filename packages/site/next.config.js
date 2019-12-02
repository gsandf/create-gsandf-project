const withTM = require('next-transpile-modules');

// Tell webpack to compile our own packages
// https://www.npmjs.com/package/next-transpile-modules
module.exports = withTM({
  transpileModules: ['@test/schema']
});
