import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import Pages from 'vite-plugin-pages';

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  plugins: [react(), Pages()],
  build: {
    // base: "/public/",
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        Perfil: resolve(root, 'pages', 'perfil', 'index.html'),
        Medicao: resolve(root, 'pages', 'medicao', 'index.html'),
        Login: resolve(root, 'pages', 'login', 'index.html')
      }
    }
  },
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
});
