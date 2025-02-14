import React from 'react';
import './CreateUserForm.css';

const CreateUserForm = () => {
  const handleCreateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      usuario: formData.get('codigoCliente'),
      senha: formData.get('newPassword'),
      nome: formData.get('nome'),
      sobrenome: formData.get('sobrenome'),
      email: formData.get('email'),
      nivel: 1 // Nível padrão do usuário
    };
    const newMedicao = {
      lente_a_maior: parseFloat(formData.get('lenteAmaior')),
      lente_a_x_eps: parseFloat(formData.get('lenteAXeps')),
      lente_a_y_eps: parseFloat(formData.get('lenteAYeps')),
      lente_a_x_cliente: parseFloat(formData.get('lenteAXcliente')),
      lente_a_y_cliente: parseFloat(formData.get('lenteAYcliente')),
      lente_b_menor: parseFloat(formData.get('lenteBmenor')),
      lente_b_x_eps: parseFloat(formData.get('lenteBXeps')),
      lente_b_y_eps: parseFloat(formData.get('lenteBYeps')),
      lente_b_x_cliente: parseFloat(formData.get('lenteBXcliente')),
      lente_b_y_cliente: parseFloat(formData.get('lenteBYcliente')),
      armacao: parseInt(formData.get('armacao')),
      tolerancia: parseFloat(formData.get('tolerancia'))
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/criarusuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newUser, ...newMedicao })
      });
  
      if (response.ok) {
        alert('Usuário criado com sucesso');
        event.target.reset();
      } else {
        alert('Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    }
  };

  return (
    <form onSubmit={handleCreateUser} className="create-user-form">
      <div className="form-collumn-left">
        <input tabindex='1' type="text" placeholder="Código do Cliente" name="codigoCliente" required className="form-input codigo-cliente" />
        {/* <input type="number" placeholder="Tipo de Armação" name="armacao" required className="form-input tipo-armacao" /> */}
        <input tabindex='2' type="number" step="0.01" placeholder="Tolerância em mm" name="tolerancia" required className="form-input tolerancia" />
      </div>
      <div className="right-collumn">
        <div className="form-medidas-row-1">
          <input tabindex='3' type="number" step="0.01" placeholder="Lente A - Maior em mm" name="lenteAmaior" required className="form-input lenteAmaior" />
          <input tabindex='6' type="number" step="0.01" placeholder="Lente B - Menor em mm" name="lenteBmenor" required className="form-input lenteBmaior" />
          {/* <input type="number" step="0.01" placeholder="Lente A - Maior em mm (Cliente)" name="lenteAmaior" className="form-input lenteAmaior" />
          <input type="number" step="0.01" placeholder="Lente B - Menor em mm (Cliente)" name="lenteBmenor" className="form-input lenteBmaior" /> */}
        </div>
        <div className="form-medidas-row-2">
          <input tabindex='4' type="number" step="0.01" placeholder="MEDIDA X | EPS" name="lenteAXeps" required className="form-input lenteXA" />
          <input tabindex='5' type="number" step="0.01" placeholder="MEDIDA Y | EPS" name="lenteAYeps" required className="form-input lenteXA" />
          {/* <input type="number" step="0.01" placeholder="MEDIDA A | Cliente" name="lenteAXcliente" className="form-input lenteXB" />
          <input type="number" step="0.01" placeholder="MEDIDA A | Cliente" name="lenteBXcliente" className="form-input lenteYB" /> */}
          <input tabindex='7' type="number" step="0.01" placeholder="MEDIDA X | EPS" name="lenteBXeps" required className="form-input lenteYA" />
          <input tabindex='8' type="number" step="0.01" placeholder="MEDIDA Y | EPS" name="lenteBYeps" required className="form-input lenteYA" />
          {/* <input type="number" step="0.01" placeholder="MEDIDA B | Cliente" name="lenteAYcliente" className="form-input lenteXB" />
          <input type="number" step="0.01" placeholder="MEDIDA B | Cliente" name="lenteBYcliente" className="form-input lenteYB" /> */}
        </div>
      </div>
      <div className="form-newuser">
        <input type="text" placeholder="Nome" name="nome" required className="form-input" />
        <input type="text" placeholder="Sobrenome" name="sobrenome" required className="form-input" />
        <input type="email" placeholder="Email" name="email" required className="form-input" />
        <input type="password" placeholder="Senha" name="newPassword" required className="form-input" />
      </div>
      <button type="submit" className="form-button">Criar Usuário</button>
    </form>
  );
};

export default CreateUserForm;
