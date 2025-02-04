import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Medicao from './pages/medicao/Medicao';
import Historico from './pages/historico/Historico';
import Perfil from './pages/perfil/perfil';
import Navbar from './componentes/Navbar/Navbar';

const App = () => {
  return (
    <div>
      <router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medicao" element={<Medicao />} />
          <Route path="/medicao/:usuario" element={<Medicao />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/historico/:usuario" element={<Historico />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </router>
    </div>
  );
};

export default App;