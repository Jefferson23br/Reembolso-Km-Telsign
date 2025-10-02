// /config/db.js

require('dotenv').config();
const { Pool } = require('pg');

// 1. Configuração do Pool de Conexões a partir do seu arquivo .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Usa a porta do .env ou 5432 como padrão
  ssl: {
    // Esta opção é frequentemente necessária para conexões com bancos de dados em nuvem
    rejectUnauthorized: false
  }
});

/**
 * 2. CORREÇÃO PRINCIPAL: Listener de Erros do Pool.
 * Este código impede que erros de conexão (como timeouts) derrubem a aplicação inteira.
 * A aplicação continuará rodando, e o erro será apenas exibido no log.
 */
pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado em um cliente ocioso do banco de dados!', err);
});

// 3. Apenas para verificar a conexão na inicialização do servidor.
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.stack);
  } else {
    console.log('✅ Conexão com o banco de dados PostgreSQL estabelecida.');
  }
});

/**
 * 4. EXPORTAÇÃO COMPATÍVEL.
 * Exportamos um objeto com a função 'query', exatamente como seu código original fazia.
 * Isso garante que o resto do seu aplicativo continue funcionando sem nenhuma alteração.
 */
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, 
};