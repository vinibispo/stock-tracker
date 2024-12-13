import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        background_color: '#FFFFFF',
        theme_color: '#6425FE',
        name: 'Stock App Designli',
        short_name: 'Stock App',
        description: 'A simple stock app using the finnhub API',
      }
    })
  ],
})
