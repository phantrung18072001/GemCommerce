/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    setupFiles: ['./src/__test__/setup.ts'],
    globals: true,
  },
});
