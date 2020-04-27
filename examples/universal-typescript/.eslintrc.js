module.exports = {
  extends: [
    require.resolve('amper-scripts/config/eslint'),
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off']
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint']
};
