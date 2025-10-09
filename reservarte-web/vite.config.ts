import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') }
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
