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
 *              password: password678
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
 *              password: password678
 *
 *    responses:
 *      "200":
 *        description: Sesión iniciada correctamente
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

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    tags: [Auth]
 *    summary: Cierra la sesión de un usuario
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - refreshToken
 *            properties:
 *              refreshToken:
 *                type: string
 *            example:
 *              refreshToken: XXXX.XXXX.XXXX
 *
 *    responses:
 *      "204":
 *        description: Cerrada sesión correctamente
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
router.post('/logout', validate(authValidation.logout), authController.logout);

/**
 * @swagger
 * /auth/forgot-password:
 *  post:
 *    tags: [Auth]
 *    summary: Solicita un cambio de contraseña
 *    description: Envía un correo electrónico con un enlace para restablecer la contraseña
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *            example:
 *              email: test@email.com
 *
 *    responses:
 *      "204":
 *        description: Correo electrónico enviado correctamente
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

module.exports = router;
