import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.typeface.json'],
  resolve: {
    alias: {
      '@': '/src', // 设置src为别名，方便引用
    }
  },
  base: './', // 关键配置：使用相对路径适配所有部署环境
  optimizeDeps: {
    include: [
      '@react-three/drei/core/OrbitControls' // 优化drei组件
    ]
  }
})
