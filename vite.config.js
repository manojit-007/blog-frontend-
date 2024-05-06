import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  // proxy: {
  //   "/api": {
  //     target: "http://localhost:8000/api",
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '/api'),
  //   },
  // },
})

