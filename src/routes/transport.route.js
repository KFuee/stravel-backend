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
router.get('/bus-stops/:id', transportController.getBusStopById);
router.get(
  '/bus-stops/:busStopId/arrival-times',
  transportController.getArrivalTimesBusStop
);

router.get('/bus-lines', transportController.getAllBusLines);
router.get('/bus-lines/:id', transportController.getBusLineById);

module.exports = router;
