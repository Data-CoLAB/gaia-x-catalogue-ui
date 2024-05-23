import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_URL,
    plugins: [react()],
    server: {
      port: 4001,
      origin: env.BASE_URL,
    },
    preview: { port: 4001 },
    resolve: {
      alias: {
        '@catalogue': path.resolve(__dirname, './src'),
      },
    },
  }
})
