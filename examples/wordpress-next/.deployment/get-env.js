/**
 * Echos all envirnoment variables set in the PM2 config
 */

const config = require('../ecosystem.config.js');

const environment = process.argv[2];
const env = Object.entries(config.deploy[environment].env);

console.log(
  env.map(([key, value]) => [key, JSON.stringify(value)].join('=')).join('\n')
);
