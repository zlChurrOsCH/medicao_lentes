import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authController from './controllers/authController.js';

// Configuração para servir os arquivos estáticos gerados pelo Vite
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Ajuste o caminho se necessário (aqui, assume que a pasta 'dist' está no diretório raiz do projeto)
app.use(express.static(path.join(__dirname, 'dist')));

// Rota catch-all para retornar o index.html em qualquer rota não reconhecida
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Rota para login
app.post('/api/login', authController.login);

// Rota para criar usuário
app.post('/api/criarusuario', authController.createUser);

// Rota para obter o Histórico baseado no ID
app.get('/api/historico/:id', authController.historicoUser);

// Rota para obter todas as medições se o usuário for administrador
app.get('/api/medicoes', authController.getAllMedicoes);

// Rota para obter o histórico de uma medição
app.get('/api/medicoes/historico/:id', authController.getMedicaoHistorico);

// Rota para atualizar uma medição
app.put('/api/medicoes/:id', authController.updateMedicao);

// Rota para importar medidas
app.post('/api/importar-medidas', authController.importarMedidas);

// Rota para exportar todas as medições (atuais e históricas)
app.get('/api/export/all', authController.exportAllData);

// Rota para exportar apenas as medições atuais
app.get('/api/export/current', authController.exportCurrentData);

// Rota para exportar dados de um cliente específico
app.get('/api/export/client/:id', authController.exportClientData);

export default app;