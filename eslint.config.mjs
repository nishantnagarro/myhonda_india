import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import { fixupPluginRules } from '@eslint/compat';

export default [
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'assets/**',
      'babel.config.js',
      'metro.config.js',
      '*.config.js',
      '*.config.mjs',
      'scripts/**',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: fixupPluginRules(reactPlugin),
      'react-native': fixupPluginRules(reactNativePlugin),
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      // 1. IMPORT SORTING & GROUPING (Auto-fixable)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports first
            ['^\\u0000'],
            // React and React Native built-in packages
            ['^react$', '^react-native$', '^expo'],
            // External 3rd party packages
            ['^@?\\w'],
            // Internal path aliases (@core, @design-system, @features, @)
            ['^@core(/.*|$)', '^@design-system(/.*|$)', '^@features(/.*|$)', '^@(/.*|$)'],
            // Parent relative imports (..)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Sibling relative imports (.)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Stylesheet imports
            ['^.+\\.styles$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // 2. MAXIMUM FILE LENGTH (Modularization gate)
      'max-lines': [
        'error',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // 3. NO INLINE STYLES (Strict .styles.ts usage)
      'react-native/no-inline-styles': 'error',

      // 4. STRICT COLOR TOKEN RULE: Fail any literal color string (#fff, rgb, etc.)
      'react-native/no-color-literals': 'error',

      // 5. STRICT I18N TEXT RULE: Fail raw unlocalized text in JSX
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['AppText'],
        },
      ],

      // 6. TYPE SAFETY & CLEANLINESS
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
