const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); // Adicione esta linha

// Caminho absoluto para o arquivo JSON
const dbFilePath = path.resolve(__dirname, '../notes/annotations.json');
let db = require(dbFilePath);

// Rota para sincronizar os dados do front-end com o backend usando PATCH
router.patch('/send-notes/:token', (req, res) => {
  const { token } = req.params;
  const { notes } = req.body;

  // Encontre o token correspondente no JSON
  const foundToken = db.tokens.find((t) => t.token === token);

  if (foundToken) {
    // Se encontrar, atualize as notas associadas a esse token
    foundToken.notes = notes;

    // Atualize o arquivo JSON com as novas informações
    updateDbFile();

    res.status(200).json({ message: 'Dados sincronizados com sucesso' });
  } else {
    // Se não encontrar, retorne um erro
    res.status(404).json({ error: 'Token não encontrado' });
  }
});

function updateDbFile() {
  // Atualize o arquivo JSON com as novas informações
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
}

module.exports = router;
