import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper';
import './perfil.css';
import useFetchUserData from '../../utils/useFetchUserData';
import CreateUserForm from '../../componentes/CreateUserForm/CreateUserForm';
import HistoricoTable from '../../componentes/HistoricoTable/HistoricoTable';
import BotaoImportarMedidas from '../../componentes/ImportarMedidas/BotaoImportarMedidas';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  // obter dados do usuário
  useFetchUserData(setUser, navigate);
  
  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

  const handleSave = () => {
    setShowUpdateForm(false);
    // Fetch updated measurements if needed
  };

  return (
    <PageWrapper title="Perfil">
      <div className="nav-bottom">
        {user && (
          <div className="cliente">
            Código do Cliente: {user.username} <br />
            Nome: {user.nome} {user.sobrenome}
          </div>
        )}
      </div>
      {user && (
        <div className="perfil-container">
          <p>USUÁRIO LOGADO: {user.username}</p>
          {user.isAdmin ? (
            <div>
              <h3>Opções Admin</h3>
              <CreateUserForm />
              <BotaoImportarMedidas />
            </div>
          ) : (
            <div>
              <h3>Opções do Usuário</h3>
              <button onClick={() => navigate('/medicao')}>Adicionar Medidas</button>
              {/* Adicione mais detalhes do usuário aqui */}
            </div>
          )}
          <HistoricoTable userId={user.username} isAdmin={user.isAdmin} />
          {showUpdateForm && (
            <UpdateMeasurementsForm
              userId={user.username}
              existingMeasurements={measurements}
              onSave={handleSave}
            />
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default Perfil;
