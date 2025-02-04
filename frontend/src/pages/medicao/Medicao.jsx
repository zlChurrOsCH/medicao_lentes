import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper';
import './medicao.css';
import useFetchUserData from '../../utils/useFetchUserData';

const Medicao = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const lenteA = 0;
  const lenteB = 0;

  useFetchUserData(setUser, navigate);

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
      saveMeasurements(user.username, lenteA, lenteB);
    } else {
      setMessage('EQUIPAMENTO DESCALIBRADO, ENTRAR EM CONTATO COM A EMBRAPOL');
    }
  };

  const saveMeasurements = (username, lenteA, lenteB) => {
    // Adicionar lógica para salvar medidas no BD
    console.log(`Saving measurements for ${username}:`, { lenteA, lenteB });
    // Implementar lógica de salvamento real aqui
  };

  const validateData = (lenteA, lenteB) => {
    // adicionar lógica de validação
    return false; // retorno modelo
  };

  return (
    <PageWrapper title="Medição">
      <div className="nav-bottom">
        <div className="cliente">CÓDIGO DO CLIENTE: {user.username}</div>
      </div>
      <h1>MEDIÇÕES</h1>
      <form onSubmit={handleSubmit} className="medicao-form">
        <div className="lente-block">
          <div className="lente">
            <h2>Lente A (maior)</h2>
            <div className="circle">Diâmetro: mm</div>
            <input type="number" name="x" placeholder="Eixo X" value={lenteA.x} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.x ? 'filled' : 'empty'} />
            <input type="number" name="y" placeholder="Eixo Y" value={lenteA.y} onChange={(e) => handleInputChange(e, lenteA, setLenteA)} className={lenteA.y ? 'filled' : 'empty'} />
          </div>
        </div>
        <div className="lente-block">
          <div className="lente">
            <h2>Lente B (menor)</h2>
            <div className="circle">Diâmetro: mm</div>
            <input type="number" name="x" placeholder="Eixo X" value= {lenteA.x} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.x ? 'filled' : 'empty'} />
            <input type="number" name="y" placeholder="Eixo Y" value={lenteB.y} onChange={(e) => handleInputChange(e, lenteB, setLenteB)} className={lenteB.y ? 'filled' : 'empty'} />
          </div>
        </div>
        <button type="submit">Salvar Medidas</button>
        {message && <p className="message">{message}</p>}
      </form>
    </PageWrapper>
  );
};

export default Medicao;