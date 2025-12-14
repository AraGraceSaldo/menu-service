import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the backend running from the solution
    proxy: {
      // forward any request starting with /api to the backend URL used by the ASP.NET launch settings
      '/api': {
        target: 'http://localhost:5201',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
