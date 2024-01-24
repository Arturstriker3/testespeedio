
// routes/tokenRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../notes/annotations.json'); // Importe seu arquivo JSON
const fs = require('fs');
const path = require('path');

// Rota para gerar um novo token e associá-lo a um array vazio de notas
router.post('/generate-token', (req, res) => {
  const newToken = generateRandomToken(6); // Função para gerar um token único
  const newEntry = {
    id: db.tokens.length + 1,
    token: newToken,
    notes: [],
  };

  db.tokens.push(newEntry);

  // Imprime o token no console
  console.log(`Token gerado: ${newToken}`);

  // Atualize o arquivo JSON com o novo token
  updateDbFile();

  res.status(200).json({ token: newToken });
});

function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    
    return token;
}

function updateDbFile(newToken) {
    const filePath = path.join(__dirname, '../notes/annotations.json');
  
    // Converta o objeto JavaScript em uma string JSON
    const jsonString = JSON.stringify(db, null, 2);
  
    // Escreva a string JSON de volta no arquivo
    fs.writeFileSync(filePath, jsonString);
  
    console.log(`Arquivo JSON atualizado com sucesso.`);
  }

module.exports = router;