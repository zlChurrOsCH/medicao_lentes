import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // Importe o módulo path

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para facilitar importações
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx', // Ponto de entrada principal (se usar SPA) ou um HTML
        home: 'src/pages/home/Home.jsx',
        login: 'src/pages/login/Login.jsx',
        perfil: 'src/pages/perfil/perfil.jsx',
        medicao: 'src/pages/medicao/Medicao.jsx', // Adicione outros pontos de entrada aqui
      },
    },
  },
});