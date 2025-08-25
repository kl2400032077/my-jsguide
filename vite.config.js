
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-jsguide/',  // Replace with your actual repo name
  plugins: [react()],
})
