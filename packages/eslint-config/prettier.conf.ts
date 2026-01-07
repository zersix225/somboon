import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

const prettierConfig = defineConfig([
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/src/generated/**'],
  },

  {
    files: ['**/*.{ts,mts,cts}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'warn',
    },
  },
]);

export default prettierConfig;
