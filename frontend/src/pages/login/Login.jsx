import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper'; // Importe PageWrapper
import API_URL from '../../config/apiConfig'; // Importe a URL da API
import './login.css';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verifique se o usuário já está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/perfil'); // Redirecione para a página de perfil
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido!');
        setSuccessMessage('Login bem-sucedido!');
        setErrorMessage('');
        localStorage.setItem('isLoggedIn', 'true'); // Salve o estado de login
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
        navigate('/perfil'); // Redirecione para a página de perfil
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Erro ao realizar o login.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Erro ao se conectar ao servidor.');
      setSuccessMessage('');
    }
  };

  return (
    <PageWrapper title="Login"> {/* Utilize PageWrapper */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <p className="form-title">{currentState}</p>
        </div>
        <div className="campos">
          <input type="text" className="form-input" placeholder="Usuário" name="username" value={username} onChange={handleInputChange}/>
          <input type="password" className="form-input" placeholder="Senha" name="password" value={password} onChange={handleInputChange}/>
        </div>
        <div className="mensagem">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
        <div className="foo-form">
          <button className='login' type="submit">Entrar</button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Login;