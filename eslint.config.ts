import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

import pluginImportX from 'eslint-plugin-import-x';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const ignores = [
  '.env',
  '.env.*',
  '.vscode',
  'coverage',
  'dist',
  'eslint.config.ts',
  'public',
  'node_modules/**/*',
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  '**/*.d.ts'
];

/**
 * ESLint Config
 */
// @ts-check
export default defineConfigWithVueTs(

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', ...ignores]),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    languageOptions: {
      globals: {
        // Add browser environment globals (window, document, etc.) to prevent
        // ESLint from flagging them as undefined
        ...globals.browser,
        // Add ES2021 environment globals (BigInt, WeakRef, etc.) to prevent
        // ESLint from flagging them as undefined
        ...globals.es2021,
      }
    },
    plugins: {
      'import-x': pluginImportX
    },
    settings: {
      // This will do the trick
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        'vue-eslint-parser': ['.vue']
      },
      'import/resolver': {
        typescript: true,
        node: true,
        alias: {
          map: [
            ['@', './src'],
            ['~', './node_modules']
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
        }
      },
      vite: {
        configPath: './vite.config.ts'
      }
    },
    rules: {
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      'quotes': [
        'error',
        'single'
      ],
      'no-unused-vars': 'off',
      'semi': [
        'error',
        'always'
      ],
      'space-before-function-paren': 'off',
      'new-cap': 'off',
      'comma-dangle': [
        'error',
        'only-multiline'
      ],
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1
        }
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array'
        }
      ],
      // Enable import sort order, see bellow.
      '@typescript-eslint/consistent-type-imports': [
        'off',
        {
          prefer: 'type-imports'
        }
      ],
      // Fix for pinia
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Fix for vite import.meta.env
      '@typescript-eslint/strict-boolean-expressions': 'off',
      // Fix for vite env.d.ts.
      '@typescript-eslint/triple-slash-reference': 'off',
      // Fix for Vue setup style
      'import/default': 'off',
      // Fix for Vue setup style
      'import-x/no-default-export': 'off',
      // Sort Import Order.
      // see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#importorder-enforce-a-convention-in-module-import-order
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            // Vue Core
            {
              pattern:
                '{vue,vue-router,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**,vuetify,vue-i18n,vuetify/**}',
              group: 'external',
              position: 'before'
            },
            // Internal Codes
            {
              pattern: '{@/**}',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always'
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always'
          }
        }
      ],
      // Mitigate non-multiword component name errors to warnings.
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'SLOT',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          alphabetical: false
        }
      ],
      'vue/first-attribute-linebreak': [
        'warn',
        {
          singleline: 'beside',
          multiline: 'beside'
        }
      ],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 10,
          multiline: 6
        }
      ],
      'vue/padding-line-between-blocks': [
        'error',
        'always'
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never'
        }
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          alignAttributesVertically: false,
        }
      ],
      'vue/mustache-interpolation-spacing':
        [
          'error',
          'always'
        ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-spacing': [
        "error",
        {
          "startTag": "never",
          "endTag": "never",
          "selfClosingTag": "always"
        }
      ],
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  ...pluginOxlint.configs['flat/recommended'],
);
