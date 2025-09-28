
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginNext from '@next/eslint-plugin-next'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'

import { config as baseConfig } from './base.js'

/**
 * Custom ESLint configuration for Next.js packages (ESLint 9+ flat config)
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
	// Base config from @repo (ESLint 9+ flat config)
	...baseConfig,

	// Base presets
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,

	// Next.js rules
	{
		plugins: {
			'@next/next': pluginNext,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.serviceworker,
			},
		},
		rules: {
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs['core-web-vitals'].rules,
		},
	},

	// React Hooks and TypeScript
	{
		plugins: {
			'react-hooks': pluginReactHooks,
		},
		settings: { react: { version: 'detect' } },
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
		},
	},
]

export default nextJsConfig
