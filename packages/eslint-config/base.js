
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import turboPlugin from 'eslint-plugin-turbo'
import onlyWarn from 'eslint-plugin-only-warn'
import eslintConfigPrettier from 'eslint-config-prettier'

/**
 * Base ESLint configuration for the monorepo
 * Compatible with ESLint 9 flat config format
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	// Base presets
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,

	// Turbo rules
	{
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			'turbo/no-undeclared-env-vars': 'warn',
		},
	},

	// only-warn plugin, for ignoring unused rules
	{
		plugins: {
			onlyWarn,
		},
	},

	// Ignore dist
	{
		ignores: ['dist/**'],
	},
]

export default config
