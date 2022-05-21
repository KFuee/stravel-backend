const express = require('express');

// controllers
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', userController.getUsers);

module.exports = router;
