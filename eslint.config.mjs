import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import importSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'
const needCheckFiles = [
  'packages/docs/src/**/*.ts',
  'packages/docs/src/**/*.tsx',
  'packages/docs/src/**/*.js',
  'packages/component/src/**/*.ts',
  'packages/component/src/**/*.tsx',
  'packages/component/src/**/*.js',
]

/** @type {Array<import("eslint").Linter.FlatConfig>} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ...pluginJs.configs.recommended,
    files: needCheckFiles,
  },
  ...tseslint.configs.recommended?.map((i) => ({
    ...i,
    files: needCheckFiles,
  })),
  { ...pluginReactConfig, files: needCheckFiles },
  {
    plugins: {
      [`simple-import-sort`]: importSort,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-useless-escape': 'off',
      'react/display-name': 'off',
      'no-console': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
]
