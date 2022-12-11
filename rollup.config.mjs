import { babel } from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import tsPaths from 'rollup-plugin-tsconfig-paths';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      tsPaths(),
      commonjs(),
      scss({
        exclude: 'node_modules/**',
        output: true,
        failOnError: true,
        outputStyle: 'compressed',
        fileName: 'bundle.css',
      }),
      babel({
        exclude: ['node_modules/**', 'src/stories/**'],
        presets: [
          '@babel/preset-react',
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/runtime',
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-react-jsx',
          '@babel/plugin-proposal-partial-application',
          [
            'babel-plugin-import',
            {
              libraryName: '@mui/material',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
            'core',
          ],
          [
            'babel-plugin-import',
            {
              libraryName: '@mui/icons-material',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
            'icons',
          ],
          ['@babel/plugin-proposal-pipeline-operator', { proposal: 'fsharp' }],
        ],
      }),
      external(),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        include: ['src/**/*'],
        exclude: [
          'dist',
          'node_modules',
          '**/*.spec.ts',
          'src/**/*.test.tsx',
          'src/stories/**',
        ],
      }),
      terser(),
    ],
  },
];
