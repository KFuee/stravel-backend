const express = require('express');

const authenticated = require('../middlewares/authenticated');

const { placesController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Lugares
 *  description: Rutas de lugares
 */

router.get('/autocomplete', authenticated(), placesController.autoComplete);

module.exports = router;
