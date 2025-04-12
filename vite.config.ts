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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 分组策略
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('lodash')) return 'vendor-lodash';
            return 'vendor-others';
          }
        }
      }
    }
  }
})
