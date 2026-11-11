import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
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
    },
    rules: {
      // STRICT COLOR TOKEN RULE: Fail any literal color string (#fff, rgb, etc.)
      'react-native/no-color-literals': 'error',

      // STRICT I18N TEXT RULE: Fail raw unlocalized text in JSX
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['AppText'],
        },
      ],

      // TYPE SAFETY
      '@typescript-eslint/no-explicit-any': 'warn',
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
