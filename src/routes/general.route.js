const express = require('express');

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
 *    description: Permite probar la conexión con la API
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 */
router.get('/test', (_req, res) => {
  res.send('La API está funcionando');
});

module.exports = router;
