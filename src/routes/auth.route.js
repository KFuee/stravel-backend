const express = require('express');

const { authController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Autenticación
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags: [Auth]
 *    description: Registra un nuevo usuario
 */
router.post('/register', authController.register);

module.exports = router;
