import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './popup.css';

const Popup = ({ message, type, onClose, user }) => {
  const navigate = useNavigate();

  const handleBackgroundClick = (e) => {
    if (e.target.className.includes('popup-background')) {
      onClose();
    }
  };

  const handleContactClick = () => {
    const whatsappMessage = `EQUIPAMENTO DESCALIBRADO! Código do Cliente: ${user.username}`;
    const whatsappUrl = `https://wa.me/5521996435349?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className="popup-background" onClick={handleBackgroundClick}>
      <div className={`popup ${type}`}>
        <button className="close-button" onClick={onClose}>X</button>
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="perfil-btn" onClick={() => navigate('/perfil')}>Voltar ao Perfil</button>
          {type === 'error' && <button className="contact-btn" onClick={handleContactClick}>Entre em contato</button>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
