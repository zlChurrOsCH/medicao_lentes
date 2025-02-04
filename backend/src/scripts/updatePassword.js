import conexao from '../database/conexao.js';
import bcrypt from 'bcrypt';

const username = 'leo'; // Substitua pelo nome de usuário desejado
const newPassword = '12345'; // Substitua pela nova senha desejada

const updatePassword = async (username, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await conexao.query('UPDATE users SET senha = ? WHERE usuario = ?', [hashedPassword, username]);
    console.log(`Senha atualizada para o usuário ${username}`);
};

updatePassword(username, newPassword).catch(console.error);
