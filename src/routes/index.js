const express = require('express');

const { env } = require('../config');

// routers
const generalRoute = require('./general.route');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');

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
