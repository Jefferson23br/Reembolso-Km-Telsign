const express = require('express');
const router = express.Router();
const { createVeiculo, getMeusVeiculos, finalizarAluguelVeiculo } = require('../controllers/veiculoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createVeiculo)
  .get(protect, getMeusVeiculos);

router.route('/:id/finalizar')
  .patch(protect, finalizarAluguelVeiculo);
  
module.exports = router;