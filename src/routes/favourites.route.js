const express = require('express');

const { favouritesController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Favourites
 *  description: Rutas de favoritos
 */

// TODO: Implementar autenticación
// TODO: Implementar validación de datos
// TODO: Documentar
router.get('/', favouritesController.getAllRecords);
router.get('/:userId', favouritesController.getAllUserRecords);
router.post('/', favouritesController.createRecord);
router.delete('/:userId/:recordId', favouritesController.deleteRecord);
router.delete('/:userId', favouritesController.deleteAllRecords);

router.get('/check/:id', favouritesController.checkIfFavourite);

module.exports = router;
