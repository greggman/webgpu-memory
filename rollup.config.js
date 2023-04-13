import terser from '@rollup/plugin-terser';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));
const banner = `/* webgpu-memory@${pkg.version}, license MIT */`;
const version = `${pkg.version.split('.')[0]}.x`;

const plugins = [
];

export default [
    {
        input: 'src/webgpu-memory.js',
        output: [
            {
                file: `dist/${version}/webgpu-memory.module.js`,
                format: 'esm',
                sourcemap: true,
                banner,
            },
        ],
        plugins,
    },
    {
        input: 'src/webgpu-memory.js',
        output: [
            {
                name: 'webgpuMemory',
                file: `dist/${version}/webgpu-memory.js`,
                format: 'umd',
                sourcemap: true,
                banner,
            },
        ],
        plugins,
    },
    {
        input: 'src/webgpu-memory.js',
        output: [
            {
                name: 'webgpuMemory',
                file: `dist/${version}/webgpu-memory.min.js`,
                format: 'umd',
                sourcemap: true,
                banner,
            },
        ],
        plugins: [
            ...plugins,
            terser(),
        ],
    },
];
