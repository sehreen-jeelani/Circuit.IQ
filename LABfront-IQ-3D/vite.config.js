/**
 * ============================================================================
 *  Circuit IQ — Virtual Physics Lab  ·  3D Frontend
 *  FILE: vite.config.js
 *  ROLE: Vite Build Configuration
 * ============================================================================
 *
 *  BUILD OUTPUT:
 *    → dist/index.html          (HTML shell)
 *    → dist/assets/index-*.js  (Bundled JS ~800KB, includes Three.js)
 *    → dist/assets/index-*.css (Bundled CSS ~27KB)
 *    → dist/public/            (Copied from public/ folder: models, textures)
 *
 *  DEV SERVER:
 *    → http://localhost:5173 (default)
 *    → Hot-reload enabled
 *
 *  PYTHON BACKEND INTEGRATION:
 *    When running via `python Circuit-IQ/main.py`, the Python server
 *    serves the dist/ folder on port 5000. Vite is only needed for dev.
 *
 * ============================================================================
 */

import { defineConfig } from 'vite';

export default defineConfig({
  // Root is the current directory (Circuit-IQ-3D/)
  root: '.',

  // Public assets directory (served as-is, no bundling)
  publicDir: 'public',

  build: {
    // Output directory for production build
    outDir: 'dist',

    // Rollup (bundler) options
    rollupOptions: {
      input: {
        // Entry point
        main: './index.html',
      },
    },

    // Warn if chunks exceed 500KB (Three.js is ~250KB minified, total ~800KB)
    chunkSizeWarningLimit: 1000,
  },

  server: {
    // Dev server port
    port: 5173,

    // Optional: proxy /api/* calls to Python backend during development
    // Uncomment below if you want API calls to go to the Python server in dev mode:
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});
