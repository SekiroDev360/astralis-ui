import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'astralis-ui/styles.css': path.resolve(__dirname, '../astralis-ui/src/index.css'),
      'astralis-ui': path.resolve(__dirname, '../astralis-ui/src/index.ts'),
    },
  },
})

