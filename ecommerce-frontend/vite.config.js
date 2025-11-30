import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/products': {
        target: 'http://16.171.132.105:8001',
        changeOrigin: true,
        secure: false,
      },
      '/cart': {
        target: 'http://16.171.132.105:8002',
        changeOrigin: true,
        secure: false,
      },
      '/orders': {
        target: 'http://16.171.132.105:8003',
        changeOrigin: true,
        secure: false,
      },
      '/payment': {
        target: 'http://16.171.132.105:8004',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://16.171.132.105:8000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
