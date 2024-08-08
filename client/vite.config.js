import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy:{
  //     '/api': 'http://13.60.65.162:5000'
  //   }
  // },
  plugins: [react()],
})
