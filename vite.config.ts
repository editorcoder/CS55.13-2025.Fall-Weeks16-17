/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Export Vite configuration - See https://vitejs.dev/config/
export default defineConfig({
  // Configure build plugins
  plugins: [
    // Add React plugin for JSX support
    react(),
    // Add legacy plugin for older browser support
    legacy()
  ],
  // Configure Vitest settings
  test: {
    // Enable global test utilities
    globals: true,
    // Set test environment to jsdom for DOM testing
    environment: 'jsdom',
    // Specify test setup file
    setupFiles: './src/setupTests.ts',
  }
})
