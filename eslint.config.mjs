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
      'max-params': 'off',
      'no-magic-numbers': 'off',
      'no-shadow': 'off'
    }
  },
  {
    'files': ['**/*.spec.ts'],
    'rules': {
      'max-lines': 'off',
      'max-lines-per-function': 'off'
    }
  }
)
