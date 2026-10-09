import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths so the site works at user.github.io and user.github.io/repo-name alike.
  base: './',
  plugins: [react(), tailwindcss()],
})
