import { defineConfig } from 'vitest/config'
import { VitestReporter } from 'tdd-guard'
import 'dotenv/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 120000,
    reporters: ['default', new VitestReporter()],
  },
})
