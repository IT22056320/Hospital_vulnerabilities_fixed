import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      deny: [
        '.env', '.env.*',
        'vite.config.ts', 'vite.config.js', 
        'package.json', 'package-lock.json'
      ]
    }
  }
})
