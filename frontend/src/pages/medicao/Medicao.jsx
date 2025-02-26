import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper';
import useFetchUserData from '../../utils/useFetchUserData';
import API_URL from '../../config/apiConfig';
import Popup from '../../componentes/Popup/popup';
import './medicao.css';

const Medicao = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [popup, setPopup] = useState({ message: '', type: '', visible: false });
  const [lenteA, setLenteA] = useState({ x_cliente: '', y_cliente: '' });
  const [lenteB, setLenteB] = useState({ x_cliente: '', y_cliente: '' });
  const [historico, setHistorico] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useFetchUserData(setUser, navigate);

  useEffect(() => {
    if (user) {
      fetchHistorico(user.id);
    }
  }, [user]);

  const fetchHistorico = async (username) => {
    try {
      const response = await fetch(`${API_URL}/historico/${user.username}`);
      const data = await response.json();
      setHistorico(data);
      console.log('Historico:', data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  useEffect(() => {
    if (historico) {
      const { lente_a_x_cliente, lente_a_y_cliente, lente_b_x_cliente, lente_b_y_cliente } = historico[0] || {};
      setLenteA({ x_cliente: lente_a_x_cliente || '', y_cliente: lente_a_y_cliente || '' });
      setLenteB({ x_cliente: lente_b_x_cliente || '', y_cliente: lente_b_y_cliente || '' });
    }
  }, [historico]);

  const handleInputChange = (e, lente, setLente) => {
    const { name, value } = e.target;
    setLente({ ...lente, [name]: value });
  };

  const validateData = (lenteA, lenteB) => {
    if (!historico || historico.length === 0) {
      setPopup({ message: 'Erro: Histórico não encontrado.', type: 'error', visible: true });
      return false;
    }

    const { tolerancia, lente_a_x_eps, lente_a_y_eps, lente_b_x_eps, lente_b_y_eps } = historico[0] || {};

    if ([tolerancia, lente_a_x_eps, lente_a_y_eps, lente_b_x_eps, lente_b_y_eps].some(v => v === undefined || v === null)) {
      setPopup({ message: 'Erro: Valores de calibração não encontrados.', type: 'error', visible: true });
      return false;
    }

    const parseNumber = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? null : num;
    };

    const lenteAX_cliente = parseNumber(lenteA.x_cliente);
    const lenteAY_cliente = parseNumber(lenteA.y_cliente);
    const lenteBX_cliente = parseNumber(lenteB.x_cliente);
    const lenteBY_cliente = parseNumber(lenteB.y_cliente);

    if ([lenteAX_cliente, lenteAY_cliente, lenteBX_cliente, lenteBY_cliente].some(v => v === null)) {
      setPopup({ message: 'Erro: Valores de entrada inválidos.', type: 'error', visible: true });
      return false;
    }

    const toleranciaNum = parseNumber(tolerancia);

    const isWithinTolerance = (cliente, eps, tolerancia) => {
      if (cliente === null || eps === null || tolerancia === null) return false;
      const precision = 100; // Ajusta para 2 casas decimais
      return Math.abs(Math.round(cliente * precision) - Math.round(eps * precision)) <= Math.round(tolerancia * precision);
    };

    if (
      !isWithinTolerance(lenteAX_cliente, lente_a_x_eps, toleranciaNum) ||
      !isWithinTolerance(lenteAY_cliente, lente_a_y_eps, toleranciaNum) ||
      !isWithinTolerance(lenteBX_cliente, lente_b_x_eps, toleranciaNum) ||
      !isWithinTolerance(lenteBY_cliente, lente_b_y_eps, toleranciaNum)
    ) {
      setPopup({
        message: `EQUIPAMENTO DESCALIBRADO! ENTRE EM CONTATO COM A EMBRAPOL PELO BOTÃO ABAIXO.`,
        type: 'error',
        visible: true
      });
      return false;
    }
    
    // Passa os dados para constante correta
    const medicaoData = {
      lenteAX_cliente, lenteAY_cliente, lenteBX_cliente, lenteBY_cliente, lente_a_x_eps, lente_a_y_eps, lente_b_x_eps,
      lente_b_y_eps, toleranciaNum
    };

    setPopup({ message: 'Parabéns! Seu leitor está validado.', type: 'success', visible: true });
    return true;
  };

  const handleSave = async (username, lenteA, lenteB) => {
    try {
      const response = await fetch(`${API_URL}/medicoes/cliente/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lenteA, lenteB }),
      });

      if (response.ok) {
        await updateMedicao(username, { lenteA, lenteB });
      }
    } catch (error) {
      console.error('Erro ao salvar medidas:', error);
    }
  };

  const updateMedicao = async (username, medicaoData) => {
    try {
      await fetch(`${API_URL}/historico/cliente/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicaoData),
      });
    } catch (error) {
      console.error('Erro ao atualizar medição:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateData(lenteA, lenteB);
    if (isValid) {
      setMessage('Parabéns! Seu leitor está validado.');
      handleSave(user.username, lenteA, lenteB);
      // window.location.reload(); // Atualiza a página
    }
  };

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
    window.location.reload(); // Atualiza a página
  };

  return (
    <PageWrapper title="Medição">
      <div className="nav-bottom">
        <div className="cliente">{user ? "CÓDIGO DO CLIENTE: " + user.username : 'Não Conectado'}</div>
      </div>  
      <button className="back-btn" onClick={() => navigate('/perfil')}>Voltar</button>
      <h1 className='title-page h1-title-page'>MEDIÇÕES</h1>
      <form onSubmit={handleSubmit} className="medicao-form">
        <div className="lente-block">
          <div className="lente">
            <h2>Lente A (maior)</h2>
            {/* <div className="circle">Diâmetro: {historico && historico[0]?.lente_a_maior} mm</div> */}
            <div className="circle_large">
              {/* Linha do raio azul */}
              <div className="raio" style={{width: `50%`, transform: `rotate(0deg)`, }}>
                <div className="ponta-raio" /> {/*BOLINHA RAIO*/}
              </div>
                Diâmetro: {historico && historico[0]?.lente_a_maior} mm
            </div>
            <div className='form-preenchimento'>
              <div className='eixo'>Medida A (eixo X): <input type="number" name="x_cliente" placeholder="Digite a medida A" value={lenteA.x_cliente} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.x_cliente ? 'filled' : 'empty'} style={{ borderColor: lenteA.x_cliente ? '' : 'red' }} /></div>
              <div className='eixo'>Medida B (eixo Y): <input type="number" name="y_cliente" placeholder="Digite a medida B" value={lenteA.y_cliente} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.y_cliente ? 'filled' : 'empty'} style={{ borderColor: lenteA.y_cliente ? '' : 'red' }} /></div>
            </div>
          </div>
        </div>
        <div className="lente-block">
          <div className="lente">
            <h2>Lente B (menor)</h2>
            {/* <div className="circle">Diâmetro: {historico && historico[0]?.lente_b_menor} mm</div> */}
            <div className="circle_small">
              {/* Linha do raio azul */}
              <div className="raio" style={{width: `50%`, transform: `rotate(0deg)`, }}>
                <div className="ponta-raio" /> {/*BOLINHA RAIO*/}
              </div>
                Diâmetro: {historico && historico[0]?.lente_b_menor} mm
            </div>
              <div className='form-preenchimento'>
                <div className='eixo'>Medida A (eixo X): <input type="number" name="x_cliente" placeholder="Digite a medida A" value={lenteB.x_cliente} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.x_cliente ? 'filled' : 'empty'} style={{ borderColor: lenteB.x_cliente ? '' : 'red' }} /></div>
                <div className='eixo'>Medida B (eixo Y): <input type="number" name="y_cliente" placeholder="Digite a medida B" value={lenteB.y_cliente} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.y_cliente ? 'filled' : 'empty'} style={{ borderColor: lenteB.y_cliente ? '' : 'red' }} /></div>
              </div>
          </div>
        </div>
        <button type="submit">Salvar Medidas</button>
      </form>
      {popup.visible && <Popup message={popup.message} type={popup.type} onClose={closePopup} user={user} />}
    </PageWrapper>
  );
};

export default Medicao;