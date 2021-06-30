module.exports = {
  extends: ['next', require.resolve('amper-scripts/config/eslint')],
  root: true,
  rules: {
    'import/no-anonymous-default-export': 'off'
  }
};
