const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('../docs/swaggerSpec');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

module.exports = router;
