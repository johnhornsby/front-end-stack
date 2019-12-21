module.exports = {
    extends: ['airbnb-base', 'plugin:react/recommended'],
    env: {
      browser: true,
      es6: true,
      'jest/globals': true,
    },
    rules: {
      'arrow-parens': ['error', 'as-needed'],
      'no-else-return': ['error', { allowElseIf: true }],
      'no-new': 0,
      'no-param-reassign': 0,
      'operator-linebreak': 0,
      'prefer-destructuring': 0,
    },
    parser: 'babel-eslint',
    plugins: ['jest', 'babel'],
    settings: {
      react: {
        version: '16.0', // React version, default to the latest React stable release
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    globals: {
      __DEVELOPMENT__: true,
      __CLIENT: true,
      __SERVER__: true,
      google: true,
    },
  };
