const express = require('express');

// const authenticated = require('../middlewares/authenticated');

const { placesController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Lugares
 *  description: Rutas de lugares
 */

// TODO: Implementar autenticación
router.get('/autocomplete', placesController.autoComplete);

router.get('/business', placesController.businessDetails);

module.exports = router;
