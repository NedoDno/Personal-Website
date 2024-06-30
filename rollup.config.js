import typescript from '@rollup/plugin-typescript';

export default {
  input: 'hw3.ts',
  output: {
    file: 'bundle.js',
       format: 'cjs'
  },
  plugins: [
    typescript()
  ]
};
