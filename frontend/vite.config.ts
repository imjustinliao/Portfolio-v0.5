import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain configured - use root path
export default defineConfig({
  base: './', // Important for S3/CloudFront deployment
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})

