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
// TODO: Implementar validación de datos
// TODO: Documentar
router.get('/autocomplete', placesController.autoComplete);

router.get('/search', placesController.businessesSearch);

router.get('/business', placesController.businessDetails);

router.get('/reviews', placesController.businessReviews);

module.exports = router;
