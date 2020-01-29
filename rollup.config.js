import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

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
		vue({
			css: true,
			compileTemplate: true,
			template: {
				isProduction: true
			}
		})
	],
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