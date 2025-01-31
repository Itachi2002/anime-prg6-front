import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/animes': {
        target: 'http://145.24.222.250:8001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/animes/, '/animes'),
      },
    },
  },
})