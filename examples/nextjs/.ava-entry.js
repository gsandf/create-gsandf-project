const path = require('path');

require('ts-node').register({
  project: path.resolve('./tsconfig.cjs.json'),
  transpileOnly: true
});
