import { defineConfig } from 'vitest/config'
import 'dotenv/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 120000,
  },
})
