import React from 'react';
import './HistoricoEdicaoTable.css';

const HistoricoEdicaoTable = ({ editData, setEditData, handleSave, isAdmin }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="history-edit">
                    <h3>Editar Medição</h3>
                    <form>
                        <div className='MaiorA_EPS'>
                            {isAdmin && (
                                <>
                                <div className='input-full-width'>
                                    <label>
                                        Lente A Maior (EPS): <br />
                                        <input type="text" value={editData.lente_a_maior} onChange={(e) => setEditData({ ...editData, lente_a_maior: e.target.value })} />
                                    </label>
                                </div>
                                <div className='input-2col'>
                                    <label>
                                        Lente A X (EPS): <br />
                                        <input type="text" value={editData.lente_a_x_eps} onChange={(e) => setEditData({ ...editData, lente_a_x_eps: e.target.value })} />
                                    </label>
                                    <label>
                                        Lente A Y (EPS):<br />
                                        <input type="text" value={editData.lente_a_y_eps} onChange={(e) => setEditData({ ...editData, lente_a_y_eps: e.target.value })} />
                                    </label>
                                </div>
                                </>
                            )}
                            <div className='input-2col'>
                                <label>
                                    Lente A X (Cliente):<br />
                                    <input type="text" value={editData.lente_a_x_cliente} onChange={(e) => setEditData({ ...editData, lente_a_x_cliente: e.target.value })} />
                                </label>
                                <label>
                                    Lente A Y (Cliente):<br />
                                    <input type="text" value={editData.lente_a_y_cliente} onChange={(e) => setEditData({ ...editData, lente_a_y_cliente: e.target.value })} />
                                </label>
                            </div>
                        </div>
                        <div className='MenorB_EPS'>
                            {isAdmin && (
                                <>
                                <div className='input-full-width'>
                                    <label>
                                        Lente B Menor (EPS):<br />
                                        <input type="text" value={editData.lente_b_menor} onChange={(e) => setEditData({ ...editData, lente_b_menor: e.target.value })} />
                                    </label>
                                </div>
                                <div className='input-2col'>
                                    <label>
                                        Lente B X (EPS):<br />
                                        <input type="text" value={editData.lente_b_x_eps} onChange={(e) => setEditData({ ...editData, lente_b_x_eps: e.target.value })} />
                                    </label>
                                    <label>
                                        Lente B Y (EPS):<br />
                                        <input type="text" value={editData.lente_b_y_eps} onChange={(e) => setEditData({ ...editData, lente_b_y_eps: e.target.value })} />
                                    </label>
                                </div>
                                </>
                            )}
                            <div className='input-2col'>
                                <label>
                                    Lente B X (Cliente):<br />
                                    <input type="text" value={editData.lente_b_x_cliente} onChange={(e) => setEditData({ ...editData, lente_b_x_cliente: e.target.value })} />
                                </label>
                                <label>
                                    Lente B Y (Cliente):<br />
                                    <input type="text" value={editData.lente_b_y_cliente} onChange={(e) => setEditData({ ...editData, lente_b_y_cliente: e.target.value })} />
                                </label>
                            </div>
                        </div>
                        {isAdmin && (
                            <>
                            {/* <label>
                                    Armação:<br />
                                    <input type="text" value={editData.armacao} onChange={(e) => setEditData({ ...editData, armacao: e.target.value })} />
                                </label> */}
                        <div className='input-center'>
                            <label>
                                Tolerância:<br />
                                <input type="text" value={editData.tolerancia} onChange={(e) => setEditData({ ...editData, tolerancia: e.target.value })} />
                            </label>
                        </div>
                            </>
                        )}
                        <button type="button" onClick={handleSave}>
                            Salvar
                        </button>
                        <button type="button" onClick={() => setEditData(null)}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HistoricoEdicaoTable;