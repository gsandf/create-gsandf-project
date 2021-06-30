module.exports = {
  extends: [require.resolve('amper-scripts/config/eslint'), 'next'],
  root: true,
  rules: {
    'import/no-anonymous-default-export': 'off'
  }
};
