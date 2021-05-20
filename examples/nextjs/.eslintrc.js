module.exports = {
  extends: [
    require.resolve('amper-scripts/config/eslint'),
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-sparse-arrays': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-key': ['error', { checkFragmentShorthand: true }]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Turn off rules that TypeScript ESLint handles
        camelcase: 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off'
      }
    }
  ]
};
