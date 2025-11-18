import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain configured - use root path
export default defineConfig({
  plugins: [react()],
  base: '/',
})

