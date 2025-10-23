// .eslintrc.js
const js = require('@eslint/js');
const globals = require('globals');
const pluginReact = require('eslint-plugin-react');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier').configs.recommended;
const prettierConfig = require('eslint-config-prettier');

module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'], // recursive
      excludedFiles: 'webpack.config.js',
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
      plugins: ['react', 'prettier'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error', // makes Prettier issues show as errors in VS Code
        'react/prop-types': 'off', // Turn off prop-types rule
        'react/react-in-jsx-scope': 'off', // React import no longer required
        'react/jsx-key': 'error', // Enforce keys in lists
      },
    },
  ],
};
