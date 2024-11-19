module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  globals: {
    __dirname: 'readonly',
    module: 'readonly',
    require: 'readonly',
    process: 'readonly',
    global: 'readonly',
  },
};
