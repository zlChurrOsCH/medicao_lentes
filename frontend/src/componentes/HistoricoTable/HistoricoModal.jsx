import React from 'react';
import './HistoricoModal.css';

const HistoricoModal = ({ historicoData, setShowHistoricoModal }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Detalhes do Histórico</h4>
        <table className="historico-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Medida A (Maior)</th>
              <th>Medida B (Menor)</th>
              <th>Tolerância</th>
            </tr>
          </thead>
          <tbody>
            {historicoData.slice().reverse().map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.atualizado_em)}</td>
                <td>Medida X: {item.lente_a_x_cliente_old}<br /> Medida Y: {item.lente_a_y_cliente_old}</td>
                <td>Medida X: {item.lente_b_x_cliente_old}<br /> Medida Y: {item.lente_b_y_cliente_old}</td>
                <td>{item.tolerancia_old}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowHistoricoModal(false)}>Fechar</button>
      </div>
    </div>
  );
};

export default HistoricoModal;
