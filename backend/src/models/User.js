import pool from '../database/conexao.js';
import bcrypt from 'bcrypt';

// Função para obter um usuário pelo nome de usuário
const getUserByUsername = async (username) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE usuario = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            user.isAdmin = user.nivel === 25; // Determina se o usuário é um administrador
            return user;
        }
        return null;
    } catch (error) {
        console.error('Erro ao obter usuário pelo nome de usuário:', error);
        throw error;
    }
};

// Função para criar um novo usuário e inserir dados na tabela de medições
const createUser = async (userData, medicaoData) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log('Criando usuário com dados:', userData);

        const [userResult] = await connection.query(
            'INSERT INTO users (usuario, senha, nome, sobrenome, email, nivel) VALUES (?, ?, ?, ?, ?, ?)',
            [userData.usuario, userData.senha, userData.nome, userData.sobrenome, userData.email, userData.nivel]
        );

        const clienteId = userData.usuario;

        console.log('Usuário criado com ID:', clienteId);

        await connection.query(
            `INSERT INTO medicoes (
                cliente_id, lente_a_maior, lente_a_x_eps, lente_a_y_eps,
                lente_a_x_cliente, lente_a_y_cliente, lente_b_menor, lente_b_x_eps,
                lente_b_y_eps, lente_b_x_cliente, lente_b_y_cliente, armacao, tolerancia
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                clienteId, medicaoData.lente_a_maior, medicaoData.lente_a_x_eps,
                medicaoData.lente_a_y_eps, medicaoData.lente_a_x_cliente,
                medicaoData.lente_a_y_cliente, medicaoData.lente_b_menor,
                medicaoData.lente_b_x_eps, medicaoData.lente_b_y_eps,
                medicaoData.lente_b_x_cliente, medicaoData.lente_b_y_cliente,
                medicaoData.armacao, medicaoData.tolerancia
            ]
        );

        await connection.commit();
        return clienteId;
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao criar usuário:', error);
        throw error;
    } finally {
        connection.release();
    }
};

const getAllMedicoes = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM medicoes');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar todas as medições:', error);
        throw error;
    }
};

const historicoUser = async (userId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medicoes WHERE cliente_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        throw error;
    }
};

// Função para obter o histórico de uma medição
const getMedicaoHistorico = async (medicaoId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medicoes_historico WHERE medicao_id = ?', [medicaoId]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar histórico da medição:', error);
        throw error;
    }
};

// Função para atualizar uma medição e registrar as alterações
const updateMedicao = async (medicaoId, updatedData) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [oldData] = await connection.query('SELECT * FROM medicoes WHERE id = ?', [medicaoId]);
        if (oldData.length === 0) {
            throw new Error('Medição não encontrada');
        }

        await connection.query(
            `UPDATE medicoes SET 
                lente_a_maior = ?, lente_a_x_eps = ?, lente_a_y_eps = ?, 
                lente_a_x_cliente = ?, lente_a_y_cliente = ?, lente_b_menor = ?, 
                lente_b_x_eps = ?, lente_b_y_eps = ?, lente_b_x_cliente = ?, 
                lente_b_y_cliente = ?, armacao = ?, tolerancia = ?, atualizado_em = NOW() 
            WHERE id = ?`,
            [
                updatedData.lente_a_maior, updatedData.lente_a_x_eps, updatedData.lente_a_y_eps,
                updatedData.lente_a_x_cliente, updatedData.lente_a_y_cliente, updatedData.lente_b_menor,
                updatedData.lente_b_x_eps, updatedData.lente_b_y_eps, updatedData.lente_b_x_cliente,
                updatedData.lente_b_y_cliente, updatedData.armacao, updatedData.tolerancia, medicaoId
            ]
        );

        await connection.query(
            `INSERT INTO medicoes_historico (
                medicao_id, lente_a_maior_old, lente_a_x_eps_old, lente_a_y_eps_old, 
                lente_a_x_cliente_old, lente_a_y_cliente_old, lente_b_menor_old, 
                lente_b_x_eps_old, lente_b_y_eps_old, lente_b_x_cliente_old, 
                lente_b_y_cliente_old, armacao_old, tolerancia_old, atualizado_em
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                medicaoId, oldData[0].lente_a_maior, oldData[0].lente_a_x_eps, oldData[0].lente_a_y_eps,
                oldData[0].lente_a_x_cliente, oldData[0].lente_a_y_cliente, oldData[0].lente_b_menor,
                oldData[0].lente_b_x_eps, oldData[0].lente_b_y_eps, oldData[0].lente_b_x_cliente,
                oldData[0].lente_b_y_cliente, oldData[0].armacao, oldData[0].tolerancia, oldData[0].atualizado_em
            ]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao atualizar medição:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Função para salvar medições fornecidas pelo usuário
const saveMedicao = async (userId, medicaoData) => {
    try {
        const [result] = await pool.query(
            `UPDATE medicoes SET 
                lente_a_x_cliente = ?, lente_a_y_cliente = ?, 
                lente_b_x_cliente = ?, lente_b_y_cliente = ? 
            WHERE cliente_id = ?`,
            [
                medicaoData.lente_a_x_cliente, medicaoData.lente_a_y_cliente,
                medicaoData.lente_b_x_cliente, medicaoData.lente_b_y_cliente,
                userId
            ]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao salvar medição:', error);
        throw error;
    }
};

const User = {
    // Função de login para verificar as credenciais do usuário
    async login (username, password) {
        try {
            const user = await getUserByUsername(username);
            if (!user || !bcrypt.compareSync(password, user.senha)) { // Verifica se o campo de senha é 'senha'
                return null;
            }
            return { ...user, isAdmin: user.isAdmin }; // Assume que 'isAdmin' é uma coluna na tabela 'users'
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            throw error;
        }
    },
    createUser,
    historicoUser,
    getAllMedicoes,
    updateMedicao,
    getMedicaoHistorico,
    saveMedicao
};

export default User;