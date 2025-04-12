import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.typeface.json'],
  optimizeDeps: {
    include: [
      '@react-three/drei/core/OrbitControls' // 优化drei组件
    ]
  }
})
