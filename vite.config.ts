import path from 'path'
import {defineConfig} from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName(format) {
        return `index.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      formats: ['es', 'cjs'],
    },
    minify: false,
    rolldownOptions: {
      external: [
        /^@?typescript/,
        'fs',
        'path',
      ],
    },
    sourcemap: true,
    target: 'node25',
  },
})

export {config as default}
