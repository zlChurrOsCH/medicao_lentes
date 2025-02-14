import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper';
import useFetchUserData from '../../utils/useFetchUserData';
import './medicao.css';

const Medicao = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [lenteA, setLenteA] = useState({ x_cliente: '', y_cliente: '' });
  const [lenteB, setLenteB] = useState({ x_cliente: '', y_cliente: '' });
  const [historico, setHistorico] = useState(null); // Add state for historico
  const navigate = useNavigate();

  // obter dados do usuário
  useFetchUserData(setUser, navigate);

  useEffect(() => {
    console.log('User state:', user);
    if (user) {
      fetchHistorico(user.id);
    }
  }, [user]);

  const fetchHistorico = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/historico/${user.username}`);
      const data = await response.json();
      setHistorico(data);
      console.log('Historico:', data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const handleInputChange = (e, lente, setLente) => {
    const { name, value } = e.target;
    setLente({ ...lente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para validar os dados
    const isValid = validateData(lenteA, lenteB);
    if (isValid) {
      setMessage('EQUIPAMENTO CALIBRADO, CONTINUE COM SEU PEDIDO');
      // Enviar pra BD
      saveMeasurements(userId, lenteA, lenteB);
    } else {
      setMessage('EQUIPAMENTO DESCALIBRADO, ENTRAR EM CONTATO COM A EMBRAPOL');
    }
  };

  const validateData = (lenteA, lenteB) => {
    // adicionar lógica de validação
    return lenteA.x_cliente && lenteA.y_cliente && lenteB.x_cliente && lenteB.y_cliente; // exemplo de validação simples
  };

  return (
    <PageWrapper title="Medição">
      <div className="nav-bottom">
        <div className="cliente">{user ? "CÓDIGO DO CLIENTE: " + user.username : 'Não Conectado'}</div>
      </div>
      <h1>MEDIÇÕES</h1>
      <form onSubmit={handleSubmit} className="medicao-form">
        <div className="lente-block">
          <div className="lente">
            <h2>Lente A (maior)</h2>
            <div className="circle">Diâmetro: {historico && historico[0]?.lente_a_maior} mm</div>
            <input type="number" name="x_cliente" placeholder="Eixo X" value={historico && historico[0]?.lente_a_x_cliente} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.x_cliente ? 'filled' : 'empty'} />
            <input type="number" name="y_cliente" placeholder="Eixo Y" value={historico && historico[0]?.lente_a_y_cliente} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.y_cliente ? 'filled' : 'empty'} />
          </div>
        </div>
        <div className="lente-block">
          <div className="lente">
            <h2>Lente B (menor)</h2>
            <div className="circle">Diâmetro: {historico && historico[0]?.lente_b_menor} mm</div>
            <input type="number" name="x_cliente" placeholder="Eixo X" value={historico && historico[0]?.lente_b_x_cliente} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.x_cliente ? 'filled' : 'empty'} />
            <input type="number" name="y_cliente" placeholder="Eixo Y" value={historico && historico[0]?.lente_b_y_cliente} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.y_cliente ? 'filled' : 'empty'} />
          </div>
        </div>
        <button type="submit">Salvar Medidas</button>
        {message && <p className="message">{message}</p>}
      </form>
    </PageWrapper>
  );
};

export default Medicao;