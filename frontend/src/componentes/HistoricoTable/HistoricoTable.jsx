import React, { useEffect, useState, useMemo } from 'react';
import './HistoricoTable.css';
import HistoricoEdicaoTable from './HistoricoEdicaoTable';
import HistoricoModal from './HistoricoModal';

const HistoricoTable = ({ userId, isAdmin }) => {
  const [historico, setHistorico] = useState([]);
  const [editData, setEditData] = useState(null);
  const [historicoData, setHistoricoData] = useState([]);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'cliente_id', direction: 'descending' });

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const url = isAdmin ? 'http://localhost:5000/api/medicoes' : `http://localhost:5000/api/historico/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    };

    if (userId || isAdmin) {
      fetchHistorico();
    }
  }, [userId, isAdmin]);

  const filteredHistorico = useMemo(() => {
    return historico.filter((medicao) =>
      Object.values(medicao).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
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
      const response = await fetch(`http://localhost:5000/api/medicoes/historico/${medicao.id}`);
      const data = await response.json();
      setHistoricoData(data);
      setShowHistoricoModal(true);
    } catch (error) {
      console.error('Erro ao buscar histórico da medição:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicoes/${editData.id}`, {
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

  return (
    <div className="historico-table-container">
      <h3>Histórico de Medições</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="historico-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('cliente_id')}>Código do Cliente {getSortIndicator('cliente_id')}</th>
            <th>Lente A {isAdmin ? '' : `(${historico[0]?.lente_a_maior})`} | EPS {getSortIndicator('lente_a_maior')}</th>
            <th>Lente B {isAdmin ? '' : `(${historico[0]?.lente_b_menor})`} | EPS {getSortIndicator('lente_b_menor')}</th>
            <th>Lente A {isAdmin ? '' : `(${historico[0]?.lente_a_maior})`} | Cliente {getSortIndicator('lente_a_maior')}</th>
            <th>Lente B {isAdmin ? '' : `(${historico[0]?.lente_b_menor})`} | Cliente {getSortIndicator('lente_b_menor')}</th>
            <th onClick={() => handleSort('armacao')}>Armação {getSortIndicator('armacao')}</th>
            <th>Tolerância {getSortIndicator('tolerancia')}</th>
            {isAdmin && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {sortedHistorico.map((medicao, index) => (
            <tr key={index}>
              <td>{medicao.cliente_id}</td>
              {isAdmin && (
                <>
                  <td>LENTE A MAIOR: {medicao.lente_a_maior}<br /> Medida X: {medicao.lente_a_x_eps}<br /> Medida Y: {medicao.lente_a_y_eps}</td>
                  <td>LENTE B MENOR: {medicao.lente_b_menor}<br /> Medida X: {medicao.lente_b_x_eps}<br /> Medida Y: {medicao.lente_b_y_eps}</td>
                  <td>LENTE A MAIOR: {medicao.lente_a_maior}<br /> Medida X: {medicao.lente_a_x_cliente}<br /> Medida Y: {medicao.lente_a_y_cliente}</td>
                  <td>LENTE B MENOR: {medicao.lente_b_menor}<br /> Medida X: {medicao.lente_b_x_cliente}<br /> Medida Y: {medicao.lente_b_y_cliente}</td>
                </>
              )}
              {!isAdmin && (
                <>
                  <td>Medida X: {medicao.lente_a_x_eps}<br /> Medida Y: {medicao.lente_a_y_eps}</td>
                  <td>Medida X: {medicao.lente_b_x_eps}<br /> Medida Y: {medicao.lente_b_y_eps}</td>
                  <td>Medida X: {medicao.lente_a_x_cliente}<br /> Medida Y: {medicao.lente_a_y_cliente}</td>
                  <td>Medida X: {medicao.lente_b_x_cliente}<br /> Medida Y: {medicao.lente_b_y_cliente}</td>
                </>
              )}
              <td>{medicao.armacao}</td>
              <td>{medicao.tolerancia}</td>
              <td>
                <button onClick={() => handleEdit(medicao)}>Editar</button>
              </td>
              <td>
                <button onClick={() => handleHistorico(medicao)}>Histórico</button>
              </td>
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
