// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.all,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  { ignores: ['dist', 'dist-*', 'eslint.config.mjs'] },
  {
    'rules': {
      'capitalized-comments': ['warn', 'always', {
        'ignoreConsecutiveComments': true
      }],
      'curly': ['error', 'multi-line', 'consistent'],
      'func-style': ['error', 'declaration', {
        'allowArrowFunctions': true
      }],
      'no-undefined': 'off',
      'max-len': ['error', {
        'code': 120,
        'ignoreUrls': true
      }],
      'max-statements': ['error', {
        'max': 15
      }],
      'one-var': ['error', 'never'],
      'sort-imports': ['error', {
        'allowSeparatedGroups': true
      }]
    }
  },
  {
    'files': ['**/*.ts'],
    'rules': {
      '@typescript-eslint/max-params': 'error',
      '@typescript-eslint/no-magic-numbers': ['error', {
        'ignoreTypeIndexes': true
      }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      '@typescript-eslint/no-use-before-define': 'error',
      'max-params': 'off',
      'no-magic-numbers': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off'
    }
  },
  {
    'files': ['**/*.spec.ts'],
    'rules': {
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off'
    }
  }
)
