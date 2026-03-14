import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		files: ['**/*.{ts,mts,cts}'],
		extends: [...tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/require-await': 'off',
		},
	},
	prettierConfig,
	{
		ignores: ['dist/**'],
	},
]);
