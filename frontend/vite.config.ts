import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/dashboard' || req.url?.startsWith('/dashboard?')) { req.url = '/app/dashboard.html'; }
          else if (req.url === '/login' || req.url?.startsWith('/login?')) { req.url = '/app/login.html'; }
          else if (req.url === '/register' || req.url?.startsWith('/register?')) { req.url = '/app/register.html'; }
          else if (['/estimation', '/quotations', '/products', '/invoices', '/receipts', '/customers', '/crm', '/marketing', '/finance', '/notifications', '/visitors', '/admin', '/settings', '/profile'].includes(req.url?.split('?')[0] || '')) {
            req.url = '/app/dashboard.html';
          }
          next();
        });
      }
    }
  ]
})
