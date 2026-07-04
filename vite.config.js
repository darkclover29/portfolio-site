import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split vendor libs so framer-motion doesn't bloat the main chunk.
        // Vite 8 (rolldown) only accepts the function form.
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') ||
              id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})

