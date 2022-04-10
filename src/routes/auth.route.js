const express = require('express');

const { authValidation } = require('../validation');
const { authController } = require('../controllers');

const validate = require('../middlewares/validate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Rutas de autenticación
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags: [Auth]
 *    description: Registra un nuevo usuario
 */
router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

module.exports = router;
