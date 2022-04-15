const express = require('express');

const authenticated = require('../middlewares/authenticated');

const { generalController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: General
 *  description: Rutas de uso general
 */

/**
 * @swagger
 * /general/test:
 *  get:
 *    tags: [General]
 *    description: Permite obtener el estado de la API
 *    security:
 *      - bearerAuth: []
 *
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '401':
 *        $ref: '#/components/responses/Unauthorized'
 */
router.get('/test', authenticated('general:test'), generalController.test);

module.exports = router;
