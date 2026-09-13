import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/rsm/' : '/',
  plugins: [react()],
  build: { rollupOptions: { output: { manualChunks: { math: ['katex'] } } } },
}));
