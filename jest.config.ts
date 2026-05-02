import type {Config} from 'jest'

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
}

export {config as default}
