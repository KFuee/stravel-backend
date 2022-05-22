const express = require('express');

// controllers
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', userController.getUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
