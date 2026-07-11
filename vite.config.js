import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/MovieHub/", // உங்கள் ரிபோசிட்டரி பெயர் 'MovieHub' என்றால் இது சரியாக இருக்க வேண்டும்
})