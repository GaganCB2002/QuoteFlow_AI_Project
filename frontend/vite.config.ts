import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8081',
          changeOrigin: true
        }
      }
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL || 'http://localhost:8081'),
    }
  }
})
