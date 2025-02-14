import 'dotenv/config'; // Carregar variáveis de ambiente do arquivo .env
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { parse as json2csv } from 'json2csv'; // Temporarily disable CSV export
import { js2xml } from 'xml-js';

const authController = {
  // Função de login
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.login(username, password);

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas: usuário ou senha incorretos' });
      }

      // Gerar token JWT
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.usuario, 
          nome: user.nome, 
          sobrenome: user.sobrenome, 
          isAdmin: user.isAdmin 
        } 
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao realizar o login. Por favor, tente novamente mais tarde.' }); 
    }
  },

  // Função para criar um novo usuário
  async createUser(req, res) {
    const { usuario, senha, nome, sobrenome, email, nivel, lente_a_maior, lente_a_x_eps, lente_a_y_eps, lente_a_x_cliente, lente_a_y_cliente, lente_b_menor, lente_b_x_eps, lente_b_y_eps, lente_b_x_cliente, lente_b_y_cliente, armacao, tolerancia } = req.body;

    if (!senha) {
      throw new Error('Senha é obrigatória');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
      const userId = await User.createUser(
        { usuario, senha: hashedPassword, nome, sobrenome, email, nivel },
        { lente_a_maior, lente_a_x_eps, lente_a_y_eps, lente_a_x_cliente, lente_a_y_cliente, lente_b_menor, lente_b_x_eps, lente_b_y_eps, lente_b_x_cliente, lente_b_y_cliente, armacao, tolerancia }
      );

      res.status(201).json({ message: 'Usuário criado com sucesso', userId });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' });
    }
  },

  async historicoUser(req, res) {
    const userId = req.params.id;
    try {
      const historico = await User.historicoUser(userId);
      res.json(historico);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      res.status(500).json({ error: 'Erro ao buscar histórico' });
    }
  },

  async getAllMedicoes(req, res) {
    try {
      const medicoes = await User.getAllMedicoes();
      res.json(medicoes);
    } catch (error) {
      console.error('Erro ao buscar todas as medições:', error);
      res.status(500).json({ error: 'Erro ao buscar todas as medições' });
    }
  },

  //ATUALIZAR MEDIDAS
  async updateMedicao(req, res) {
    const medicaoId = req.params.id;
    const updatedData = req.body;

    try {
      await User.updateMedicao(medicaoId, updatedData);
      res.json({ message: 'Medição atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar medição:', error);
      res.status(500).json({ error: 'Erro ao atualizar medição' });
    }
  },

  async getMedicaoHistorico(req, res) {
    const medicaoId = req.params.id;
    try {
      const historico = await User.getMedicaoHistorico(medicaoId);
      res.json(historico);
    } catch (error) {
      console.error('Erro ao buscar histórico da medição:', error);
      res.status(500).json({ error: 'Erro ao buscar histórico da medição' });
    }
  },

  async importarMedidas(req, res) {
    const { usuarios } = req.body;

    if (!Array.isArray(usuarios)) {
      console.log('Formato de dados inválido:', req.body);
      return res.status(400).json({ message: 'Formato de dados inválido' });
    }

    try {
      for (const medidas of usuarios) {
        const { usuario, senha, nome, sobrenome, email, nivel, ...medicaoData } = medidas;

        // Verifica se todos os campos necessários estão presentes
        if (!usuario || !senha || !nome || !sobrenome || !email || !nivel) {
          console.log('Campos faltando:', {
            usuario: !!usuario,
            senha: !!senha,
            nome: !!nome,
            sobrenome: !!sobrenome,
            email: !!email,
            nivel: !!nivel
          });
          return res.status(400).json({ message: 'Todos os campos de usuário são obrigatórios' });
        }

        console.log('Dados recebidos:', { usuario, senha, nome, sobrenome, email, nivel, medicaoData });

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria o usuário e insere as medidas no banco de dados
        const userId = await User.createUser(
          { usuario, senha: hashedPassword, nome, sobrenome, email, nivel },
          medicaoData
        );

        console.log('Usuário criado com ID:', userId);
      }

      res.status(201).json({ message: 'Medidas importadas com sucesso' });
    } catch (error) {
      console.error('Erro ao importar medidas:', error);
      res.status(500).json({ message: 'Erro ao importar medidas. Por favor, tente novamente mais tarde.' });
    }
  },

  async exportAllData(req, res) {
    const format = req.query.format || 'json';
    try {
      const allData = await User.getAllData();
      // Temporarily disable CSV export
      // if (format === 'csv') {
      //   const csv = json2csv(allData);
      //   res.header('Content-Type', 'text/csv');
      //   res.attachment('all_data.csv');
      //   return res.send(csv);
      // } else 
      if (format === 'xml') {
        const xml = js2xml({ root: allData }, { compact: true, ignoreComment: true, spaces: 4 });
        res.header('Content-Type', 'application/xml');
        res.attachment('all_data.xml');
        return res.send(xml);
      } else {
        res.json(allData);
      }
    } catch (error) {
      console.error('Erro ao exportar todos os dados:', error);
      res.status(500).json({ message: 'Erro ao exportar todos os dados. Por favor, tente novamente mais tarde.' });
    }
  },

  async exportCurrentData(req, res) {
    const format = req.query.format || 'json';
    try {
      const currentData = await User.getCurrentData();
      // Temporarily disable CSV export
      // if (format === 'csv') {
      //   const csv = json2csv(currentData);
      //   res.header('Content-Type', 'text/csv');
      //   res.attachment('current_data.csv');
      //   return res.send(csv);
      // } else 
      if (format === 'xml') {
        const xml = js2xml({ root: currentData }, { compact: true, ignoreComment: true, spaces: 4 });
        res.header('Content-Type', 'application/xml');
        res.attachment('current_data.xml');
        return res.send(xml);
      } else {
        res.json(currentData);
      }
    } catch (error) {
      console.error('Erro ao exportar dados atuais:', error);
      res.status(500).json({ message: 'Erro ao exportar dados atuais. Por favor, tente novamente mais tarde.' });
    }
  },

  async exportClientData(req, res) {
    const format = req.query.format || 'json';
    const clientId = req.params.id;
    try {
      const clientData = await User.getClientData(clientId);
      // CSV Desativado temporariamente
      // if (format === 'csv') {
      //   const csv = json2csv(clientData);
      //   res.header('Content-Type', 'text/csv');
      //   res.attachment(`client_${clientId}_data.csv`);
      //   return res.send(csv);
      // } else 
      if (format === 'xml') {
        const xml = js2xml({ root: clientData }, { compact: true, ignoreComment: true, spaces: 4 });
        res.header('Content-Type', 'application/xml');
        res.attachment(`client_${clientId}_data.xml`);
        return res.send(xml);
      } else {
        res.json(clientData);
      }
    } catch (error) {
      console.error('Erro ao exportar dados do cliente:', error);
      res.status(500).json({ message: 'Erro ao exportar dados do cliente. Por favor, tente novamente mais tarde.' });
    }
  }
};

export default authController;