module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react-hooks', '@typescript-eslint', 'prettier', 'react'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/no-unresolved': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-wrap-multilines': [1, { assignment: 'parens-new-line' }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'no-param-reassign': [2, { props: false }],
    'arrow-parens': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true
      }
    ],
    'react/require-default-props': 'off',
    'no-case-declarations': 'off',
    'import/prefer-default-export': 'off',
    'no-control-regex': 'off',
    'react/prop-types': ['off'],
    'no-underscore-dangle': ['warn'],
    'implicit-arrow-linebreak': 'off',
    semi: 'off',
    'quote-props': [2, 'as-needed'],
    'comma-dangle': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'function-paren-newline': 'off',
    indent: 'off',
    'no-undef': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
    'operator-linebreak': 'off'
  }
}
