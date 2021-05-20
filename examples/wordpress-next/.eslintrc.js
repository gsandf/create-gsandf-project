module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'gsandf-react'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-sparse-arrays': 'off',
    // Turn off rules that TypeScript ESLint handles
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true }
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }]
  }
};
