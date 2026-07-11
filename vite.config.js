import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // அல்லது உங்கள் வெர்ஷனுக்கு ஏற்ப

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/MovieHub/", 
})