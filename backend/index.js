require('dotenv').config(); 

const express = require('express');
const path = require('path');

// --- Rotas da Aplicação ---
const authRoutes = require('./routes/authRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const viagemRoutes = require('./routes/viagemRoutes');
const despesaRoutes = require('./routes/despesaRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

// --- Inicialização do Express ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares Essenciais ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('API do Reembolso de Km - Telsign está no ar!');
});

app.use('/api/auth', authRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/viagens', viagemRoutes);
app.use('/api/despesas', despesaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/pagamentos', pagamentoRoutes); 
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/relatorios', relatorioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});