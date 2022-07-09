const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
