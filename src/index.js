const express = require('express');
const app = express();
require("dotenv/config")

// Configurando Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurações do banco de dados
require('./config/db');

// Setando rotas 
const tasksRouter = require('./controllers/tasks');
app.use('/', tasksRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});