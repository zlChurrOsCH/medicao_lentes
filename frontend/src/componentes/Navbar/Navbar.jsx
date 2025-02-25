import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import './Navbar.css';

const Navbar = () => {
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Captura o título da página definido no head
    const title = document.title;
    setPageTitle(title);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpa todo o cache do localStorage
    navigate('/login'); // Redirecione para a página de login
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-top">
          <h2 className="titulo-pagina">{pageTitle}</h2> {/* Exiba o título dinâmico */}
          <div className="icons">
            <div className="profile-group">
              <BiUser className="icon" />
              <div className="dropdown-menu">
                <Link to="/login">
                  <p className="dropdown-item">LOGIN</p>
                </Link>
                <p className="dropdown-item" onClick={handleLogout}>LOGOUT</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
