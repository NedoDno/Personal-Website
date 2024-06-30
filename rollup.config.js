import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/hw3.ts',
  output: {
    file: './dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
};
