import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    viteCompression({ algorithm: 'brotliCompress' }),
    ViteImageOptimizer()
  ],
  assetsInclude: ['**/*.typeface.json'],
  resolve: {
    alias: {
      '@': '/src', // 设置src为别名，方便引用
    }
  },
  base: './', // 关键配置：使用相对路径适配所有部署环境
  optimizeDeps: {
    include: [
      '@react-three/drei/core/OrbitControls', // 优化drei组件
      '@react-three/drei', // 整体提前编译
      'three',
      '@react-three/fiber'
    ]
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@react-three/fiber')) return 'vendor_r3f';
            if (id.includes('@react-three/drei')) return 'vendor_drei';
            if (id.includes('three/src')) return 'vendor_three_core';
            if (id.includes('framer-motion')) return 'vendor_animations';
            return 'vendor';
          }
        }
      }
    }
  }
})
