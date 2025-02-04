import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [react(), Pages()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // REMOVA a seção build.rollupOptions.input completamente
});