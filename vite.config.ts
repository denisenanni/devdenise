import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false, // Don't auto-open browser
      filename: 'dist/stats.html', // Output location
      gzipSize: true, // Show gzip sizes
      brotliSize: true, // Show brotli sizes
    }),
  ],
  base: '/', // Use root path for custom domain (devdenise.com)
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'd3-vendor': ['d3-selection', 'd3-transition', 'd3-ease'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // Warn if chunk > 500KB
  },
})
