import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV !== 'development' ? '/hahow/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 手動映射
    },
  },
});
