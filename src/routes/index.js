const express = require('express');

const { env } = require('../config');

// routers
const generalRoute = require('./general.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const placesRoute = require('./places.route');
const historyRoute = require('./history.route');
const favouritesRoute = require('./favourites.route');
const transportRoute = require('./transport.route');

const router = express.Router();

const routes = [
  {
    path: '/general',
    route: generalRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/places',
    route: placesRoute,
  },
  {
    path: '/history',
    route: historyRoute,
  },
  {
    path: '/favourites',
    route: favouritesRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/transport',
    route: transportRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

routes.forEach(({ path, route }) => router.use(path, route));

if (env === 'development') {
  devRoutes.forEach(({ path, route }) => router.use(path, route));
}

module.exports = router;
