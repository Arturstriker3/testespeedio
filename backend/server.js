// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const annotationRoutes = require('./routes/annotationRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const syncRoutes = require('./routes/syncRoutes');

const app = express();
const port = 3000;

// Configurar o middleware CORS
app.use(cors());

const annotationsFilePath = path.join(__dirname, 'notes', 'annotations.json');

// Middleware para permitir requisições POST com JSON
app.use(express.json());

// Rotas de anotação
app.use('/api', annotationRoutes);

// Rota para novo token
app.use('/api', tokenRoutes);

// Rota de sincronização
// Altere a configuração do middleware syncRoutes
app.use('/api', syncRoutes);

// Rota para obter todas as anotações
app.get('/api/annotations', (req, res) => {
  try {
    // Lê o conteúdo do arquivo e o envia como resposta
    const annotationsContent = fs.readFileSync(annotationsFilePath, 'utf8');
    res.json(JSON.parse(annotationsContent));
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    res.status(500).json({ error: 'Erro ao obter as anotações' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
