const express = require('express');

// const authenticated = require('../middlewares/authenticated');

const { transportController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Transporte
 *  description: Rutas de transporte
 */

// TODO: Implementar autenticación
// TODO: Implementar validación de datos
// TODO: Documentar
router.get('/bus-stops', transportController.getAllBusStops);

module.exports = router;
