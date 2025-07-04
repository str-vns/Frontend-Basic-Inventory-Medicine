import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
// Load environment variables from .env file
config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@medicine" : path.resolve(__dirname, "./src/medicine"),
      '@user' : path.resolve(__dirname, "./src/user"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      '@api': path.resolve(__dirname, "./src/api"),
      '@store': path.resolve(__dirname, "./src/api/store"),
      '@types' : path.resolve(__dirname, "./src/types"),
      '@inventory': path.resolve(__dirname, "./src/inventory"),
      '@data': path.resolve(__dirname, "./src/data"),
    },
  },
})
