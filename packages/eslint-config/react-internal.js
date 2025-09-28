
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'

import { config as baseConfig } from './base.js'

/**
 * ESLint config for React internal libraries (flat config, ESLint 9+)
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	// Base config from @repo (ESLint 9+ flat config)
	...baseConfig,

	// Base presets
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,

	// React
	pluginReact.configs.flat.recommended,

	// Config for browser
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.serviceworker,
			},
		},
	},

	// React Hooks and TypeScript
	{
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
		},
	},
]

export default config
