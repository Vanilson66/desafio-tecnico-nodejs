require("dotenv/config");
const mongoose = require('mongoose');

const db_URL = process.env.DB_URL;

mongoose.connect(db_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Conexão com o banco de dados estabelecida.');
});
db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));