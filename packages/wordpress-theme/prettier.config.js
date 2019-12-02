const baseConfig = require('amper-scripts/config/prettier.config.js');

module.exports = {
  ...baseConfig,
  plugins: ['@prettier/plugin-php']
};
