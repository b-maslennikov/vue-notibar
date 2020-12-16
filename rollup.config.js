import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import eslint from '@rollup/plugin-eslint'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'

const name = 'VueNotibar'
const packageName = 'vue-notibar'
const version = require('./package.json').version

const banner =
	'/*!\n' +
	` * ${packageName} v${version}\n` +
	` * (c) 2019-${new Date().getFullYear()} Boris Maslennikov\n` +
	' * Released under the MIT License.\n' +
	' */'

module.exports = {
	input: 'src/index.js',
	plugins: [
		resolve({
			extensions: ['.vue']
		}),
		scss(),
		vue({
			template: {
				isProduction: true
			}
		}),
		eslint({
			throwOnError: true,
			include: ['src']
		}),
		cleanup()
	],
	watch: {
		exclude: ['node_modules/**']
	},
	output: [
		{
			name,
			file: `dist/${packageName}.js`,
			format: 'umd',
			banner
		},
		{
			name,
			file: `dist/${packageName}.min.js`,
			format: 'umd',
			plugins: [terser()],
			banner
		}
	]
}