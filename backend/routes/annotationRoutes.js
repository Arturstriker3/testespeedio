// routes/annotationRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../notes/annotations.json'); // Importe seu arquivo JSON

// Rota para recuperar as notas com base no token
router.get('/annotations', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  // Encontre o token correspondente no JSON
  const foundToken = db.tokens.find((t) => t.token === token);

  if (foundToken) {
    // Se encontrar, retorne as notas associadas a esse token
    return res.status(200).json(foundToken.notes);
  } else {
    // Se não encontrar, retorne um erro
    return res.status(404).json({ error: 'Token não encontrado' });
  }
});

module.exports = router;
