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
 *    summary: Registra un nuevo usuario
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: debe ser único
 *              password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                description: debe contener al menos un número y una letra
 *            example:
 *              name: Test Username
 *              email: test@email.com
 *              password: password
 *
 *    responses:
 *      "200":
 *        description: Creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                tokens:
 *                  $ref: '#/components/schemas/AuthTokens'
 *      "401":
 *        description: Email o contraseña inválido
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              code: 401
 *              message: Email o contraseña inválido
 */
router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    summary: Inicia la sesión de un usuario
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *            example:
 *              email: test@email.com
 *              password: password
 *
 *    responses:
 *      "200":
 *        description: Iniciada sesión correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                tokens:
 *                  $ref: '#/components/schemas/AuthTokens'
 *      "401":
 *        description: Email o contraseña inválido
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              code: 401
 *              message: Email o contraseña inválido
 */
router.post('/login', validate(authValidation.login), authController.login);

router.post('/logout', validate(authValidation.logout), authController.logout);

module.exports = router;
