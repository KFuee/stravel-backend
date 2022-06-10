const generalController = require('./general.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const placesController = require('./places.controller');
const historyController = require('./history.controller');
const favouritesController = require('./favourites.controller');
const transportController = require('./transport.controller');

module.exports = {
  generalController,
  authController,
  userController,
  placesController,
  historyController,
  favouritesController,
  transportController,
};
