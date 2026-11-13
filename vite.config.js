import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (name) => fileURLToPath(new URL(`./${name}.html`, import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is lazy-loaded in its own chunk after first paint
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      // the site, plus two plain static pages
      input: { main: page('index'), privacy: page('privacy'), terms: page('terms') },
    },
  },
})
