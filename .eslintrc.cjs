module.exports = {
	root: true,
	extends: [
		'janus/js',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: {
		es2021: true,
		node: true
	},
	globals: {
		assert: 'readonly',
	},
	rules: {
		// 'promise/catch-or-return': 'off',
		// 'promise/prefer-await-to-callbacks': 'off',
		// 'promise/always-return': 'off',
		// 'promise/no-nesting': 'off',

	}
}
