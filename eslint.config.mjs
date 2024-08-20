// @ts-check

import eslint from '@eslint/js'
import mochaPlugin from 'eslint-plugin-mocha'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'dist-*', 'eslint.config.mjs'] },
  eslint.configs.all,
  stylistic.configs['all-flat'],
  mochaPlugin.configs.flat.recommended,
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
  {
    rules: {
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/brace-style': ['error', '1tbs', {
        'allowSingleLine': true
      }],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/multiline-comment-style': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': true
      }],
      '@stylistic/padded-blocks': ['error', 'never', {
        'allowSingleLineBlocks': true
      }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }],
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
    files: ['**/*.ts'],
    rules: {
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
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off'
    }
  },
  {
    files: ['src/rewrites.spec.ts'],
    rules: {
      'mocha/no-mocha-arrows': 'off',
      'mocha/no-setup-in-describe': 'off'
    }
  }
)
