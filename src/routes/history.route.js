const express = require('express');

const { historyController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: History
 *  description: Rutas de historial
 */

// TODO: Implementar autenticación
// TODO: Implementar validación de datos
// TODO: Documentar
router.get('/', historyController.getAllRecords);
router.get('/records/:userId', historyController.getAllUserRecords);
router.post('/records', historyController.createRecord);
router.delete('/records/:userId', historyController.deleteAllRecords);

module.exports = router;
