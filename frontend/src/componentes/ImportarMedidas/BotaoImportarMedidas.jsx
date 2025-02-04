import React from 'react';
import Papa from 'papaparse';

const BotaoImportarMedidas = () => {
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      let data;

      try {
        if (file.type === 'application/json') {
          data = JSON.parse(text);
          // Enviar dados para o banco de dados
          await importarMedidas(data);
        } else if (file.type === 'text/csv') {
          data = Papa.parse(text, { header: true }).data;
          // Enviar dados para o banco de dados
          await importarMedidas({ usuarios: data });
        } else {
          console.error('Formato de arquivo não suportado');
          return;
        }
      } catch (error) {
        console.error('Erro ao fazer parsing do arquivo:', error);
        return;
      }

      console.log('Dados a serem enviados:', data);
    };

    reader.readAsText(file);
  };

  const importarMedidas = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/importar-medidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao importar medidas:', errorData.message);
        throw new Error('Erro ao importar medidas');
      }

      const result = await response.json();
      console.log('Medidas importadas com sucesso:', result);
    } catch (error) {
      console.error('Erro ao importar medidas:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".json,.csv" onChange={handleFileUpload} style={{ display: 'none' }} id="fileInput" />
      <button onClick={() => document.getElementById('fileInput').click()}>
        Importar Medidas
      </button>
    </div>
  );
};

export default BotaoImportarMedidas;
