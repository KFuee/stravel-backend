const swaggerJsdoc = require('swagger-jsdoc');

const { version } = require('../../package.json');
const { port } = require('../config');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'UrbanMobility API',
    version,
    license: {
      name: 'GNU General Public License v3.0',
      url: 'https://github.com/KFuee/urban-mobility/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/components.yml', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
