require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, 
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado em um cliente ocioso do banco de dados!', err);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.stack);
  } else {
    console.log('✅ Conexão com o banco de dados PostgreSQL estabelecida.');
  }
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, 
};