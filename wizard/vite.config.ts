import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 4000 },
  preview: { port: 4000 },
  resolve: {
    alias: {
      '@wizard': path.resolve(__dirname, './src'),
    },
  },
})
