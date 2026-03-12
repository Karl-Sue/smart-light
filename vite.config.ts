import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/smart-light/', // Adjusted to match your exact GitHub repository name
  plugins: [react()],
})
