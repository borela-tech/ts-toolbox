import path from 'path'
import {defineConfig} from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    minify: false,
    rolldownOptions: {
      external: [
        /^@?typescript/,
        'path',
      ],
      output: {
        entryFileNames: 'index.[format].js',
      },
    },
    sourcemap: true,
    target: 'node25',
  },
})

export {config as default}
