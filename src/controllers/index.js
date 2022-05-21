const generalController = require('./general.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const placesController = require('./places.controller');
const historyController = require('./history.controller');
const favouritesController = require('./favourites.controller');

module.exports = {
  generalController,
  authController,
  userController,
  placesController,
  historyController,
  favouritesController,
};
