import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using repository name as base for GitHub Pages
// Once custom domain DNS is configured, GitHub will handle routing automatically
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio-v0.5/',
})

