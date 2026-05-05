module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  requireConfigFile: false,

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    es6: true,
    node: true,
  },

  plugins: ['react'],

  extends: ['eslint:recommended', 'plugin:react/recommended'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'react/react-in-jsx-scope': 'off', // for React 17+
  },
};