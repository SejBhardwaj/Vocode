import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'three': ['three'],
          'ogl': ['ogl'],
          'framer': ['framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@splinetool/react-spline', '@splinetool/runtime', 'three', 'ogl', 'framer-motion']
  }
})
