import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')

export default [
    {
        input: './src/index.js',
        output: [
            {
                name: 'ReactSplit',
                file: pkg.main,
                format: 'umd',
                sourcemap: false,
                banner: `/*! ${pkg.name} - v${pkg.version} */\n`,
                globals: {
                    react: 'React',
                    'prop-types': 'PropTypes',
                    'split.js': 'Split',
                },
            },
            {
                file: pkg.module,
                format: 'esm',
                sourcemap: false,
            },
        ],
        external: ['split.js', 'react', 'prop-types'],
        plugins: [
            buble({
                exclude: 'node_modules/**',
                objectAssign: 'Object.assign',
                transforms: {
                    forOf: false,
                },
            }),
        ],
    },
    {
        input: './src/index.js',
        output: {
            name: 'ReactSplit',
            file: pkg['minified:main'],
            format: 'umd',
            sourcemap: true,
            banner: `/*! ${pkg.name} - v${pkg.version} */\n`,
            globals: {
                react: 'React',
                'prop-types': 'PropTypes',
                'split.js': 'Split',
            },
        },
        external: ['split.js', 'react', 'prop-types'],
        plugins: [
            buble({
                exclude: 'node_modules/**',
                objectAssign: 'Object.assign',
                transforms: {
                    forOf: false,
                },
            }),
            terser(),
        ],
    },
]
