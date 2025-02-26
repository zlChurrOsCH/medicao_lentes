import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoricoEdicaoTable from './HistoricoEdicaoTable';
import HistoricoModal from './HistoricoModal';
import API_URL from '../../config/apiConfig'
import './HistoricoTable.css';

const HistoricoTable = ({ userId, isAdmin }) => {
  const [historico, setHistorico] = useState([]);
  const [editData, setEditData] = useState(null);
  const [historicoData, setHistoricoData] = useState([]);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'cliente_id', direction: 'descending' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const url = isAdmin ? (`${API_URL}/medicoes`) : (`${API_URL}/historico/${userId}`);
        const response = await fetch(url);
    
        if (!response.ok) { // Verifica se a resposta não está OK (status 2xx)
          const errorText = await response.text(); // Tenta obter o texto do erro (pode ser HTML ou texto simples)
          throw new Error(`Erro na requisição: ${response.status} - ${errorText}`); // Lança um erro com mais detalhes
        }
    
        const data = await response.json(); // Tenta parsear a resposta como JSON (só se response.ok for true)
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        // Exiba uma mensagem de erro amigável para o usuário (ex: um alerta)
        // alert("Ocorreu um erro ao carregar o histórico. Tente novamente mais tarde.");
      }
    };

    if (userId || isAdmin) {
      fetchHistorico();
    }
  }, [userId, isAdmin]);

  const filteredHistorico = useMemo(() => {
    return historico.filter((medicao) =>
      medicao.cliente_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, historico]);

  const sortedHistorico = useMemo(() => {
    return [...filteredHistorico].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredHistorico, sortConfig]);

  const handleEdit = (medicao) => {
    setEditData(medicao);
  };

  const handleHistorico = async (medicao) => {
    try {
      const response = await fetch(`${API_URL}/medicoes/historico/${medicao.id}`);
      const data = await response.json();
      setHistoricoData(data);
      setShowHistoricoModal(true);
    } catch (error) {
      console.error('Erro ao buscar histórico da medição:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/medicoes/${editData.cliente_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setHistorico((prev) =>
          prev.map((item) => (item.id === editData.id ? editData : item))
        );
        setEditData(null);
      } else {
        console.error('Erro ao atualizar medição');
      }
    } catch (error) {
      console.error('Erro ao atualizar medição:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  const exportData = async (option, format = 'json', clientId = null) => {
    let url;
    switch (option) {
      case 'all':
        url = `${API_URL}/export/all?format=${format}`;
        break;
      case 'current':
        url = `${API_URL}/export/current?format=${format}`;
        break;
      case 'client':
        url = `${API_URL}/export/client/${clientId}?format=${format}`;
        break;
      default:
        return;
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      const blob = new Blob([data], { type: format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${option}_data.${format}`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  };
  
  const handleExport = () => {
    const option = prompt('Escolha uma opção: \n1. Exportar tudo \n2. Exportar Atuais \n3. Exportar cliente X');
    const format = prompt('Escolha o formato: \n1. JSON \n2. XML \n3. CSV');
    let formatOption = 'json';
    if (format === '2') {
      formatOption = 'xml';
    } else if (format === '3') {
      formatOption = 'csv';
    }
    
    if (option === '1') {
      exportData('all', formatOption);
    } else if (option === '2') {
      exportData('current', formatOption);
    } else if (option === '3') {
      const clientId = prompt('Digite o ID do cliente:');
      exportData('client', formatOption, clientId);
    }
  };

  return (
    <div className="historico-table-container">
      {isAdmin ? (
        <>
        <h3>Histórico de Medições</h3>
        <div className="header-actions">
          <input type="text" className="search-input" placeholder="Código do cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="export-button" onClick={handleExport}>Exportar Dados</button>
        </div>
        </>
      ) : (<h3>MEUS PEDIDOS</h3>)}
      <table className="historico-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('cliente_id')}>Código do Cliente {getSortIndicator('cliente_id')}</th>
            {isAdmin ? (
              <>
              <th onClick={() => handleSort('lente_a_maior')}>Lente A Maior | EPS{getSortIndicator('lente_a_maior')}</th>
              <th onClick={() => handleSort('lente_b_menor')}>Lente B Menor | EPS{getSortIndicator('lente_b_menor')}</th>
              <th onClick={() => handleSort('lente_a_maior')}>Lente A Maior | Cliente {getSortIndicator('lente_a_maior')}</th>
              <th onClick={() => handleSort('lente_b_menor')}>Lente B Menor | Cliente {getSortIndicator('lente_b_menor')}</th>
              </>
            ) : (
              <>
              <th>Lente A ({historico[0]?.lente_a_maior}) | EPS</th>
              <th>Lente B ({historico[0]?.lente_b_menor}) | EPS</th>
              </>
            )}
            
            {/* <th onClick={() => handleSort('armacao')}>Armação {getSortIndicator('armacao')}</th> */}
            <th>Tolerância {getSortIndicator('tolerancia')}</th>
            {isAdmin ? <th>Ações</th> : <th>Ação</th>}
          </tr>
        </thead>
        <tbody>
          {sortedHistorico.map((medicao, index) => (
            <tr key={index}>
              <td>{medicao.cliente_id}</td>
              {isAdmin ? (
                <>
                  <td>LENTE A MAIOR: {medicao.lente_a_maior}<br /> Medida X: {medicao.lente_a_x_eps}<br /> Medida Y: {medicao.lente_a_y_eps}</td>
                  <td>LENTE B MENOR: {medicao.lente_b_menor}<br /> Medida X: {medicao.lente_b_x_eps}<br /> Medida Y: {medicao.lente_b_y_eps}</td>
                  <td>LENTE A MAIOR: {medicao.lente_a_maior}<br /> Medida X: {medicao.lente_a_x_cliente}<br /> Medida Y: {medicao.lente_a_y_cliente}</td>
                  <td>LENTE B MENOR: {medicao.lente_b_menor}<br /> Medida X: {medicao.lente_b_x_cliente}<br /> Medida Y: {medicao.lente_b_y_cliente}</td>
                </>
              ) : (
                <>
                  <td>Medida X: {medicao.lente_a_x_cliente}<br /> Medida Y: {medicao.lente_a_y_cliente}</td>
                  <td>Medida X: {medicao.lente_b_x_cliente}<br /> Medida Y: {medicao.lente_b_y_cliente}</td>
                </>
              )}
              {/* <td>{medicao.armacao}</td> */}
              <td>{medicao.tolerancia}</td>
              {isAdmin ? (
                <>
                <td class="btn-acoes">
                <button onClick={() => handleEdit(medicao)}>Editar</button> &nbsp;
                <button onClick={() => handleHistorico(medicao)}>Histórico</button>
              </td>
                </>
              ) : (
                <>
                <td class="btn-acao">
                {/* <button onClick={() => handleEdit(medicao)}>Adicionar Medida</button> - ANTIGO MODAL EDIÇÃO*/}
                <button onClick={() => navigate(`/medicao/${userId}`)}>Adicionar Medidas</button>
              </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <HistoricoEdicaoTable
          editData={editData}
          setEditData={setEditData}
          handleSave={handleSave}
          isAdmin={isAdmin}
        />
      )}

      {showHistoricoModal && (
        <HistoricoModal
          historicoData={historicoData}
          setShowHistoricoModal={setShowHistoricoModal}
        />
      )}
    </div>
  );
};

export default HistoricoTable;
