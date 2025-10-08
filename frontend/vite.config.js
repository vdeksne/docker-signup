import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Allow overriding the backend target with BACKEND_URL to support
// running the dev server inside Docker (target would be http://server:8000)
const backend = process.env.BACKEND_URL || 'http://localhost:5000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Use polling for file watching inside Docker on Windows/WSL hosts.
    // Polling is a bit heavier but much more reliable for mounted volumes.
    watch: {
      usePolling: true,
      interval: 100
    },
    proxy: {
      '/api': {
        target: backend,
        changeOrigin: true,
        // Do not strip the `/api` prefix — backend routes include `/api`.
        // Forward the path as-is so /api/users -> backend:/api/users
        rewrite: (path) => path
      }
    }
  }
})
