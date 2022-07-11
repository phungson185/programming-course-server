const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const categoryRoute = require('./category.route');
const courseRoute = require('./course.route');
const attendanceRoute = require('./attendance.route');
const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/attendance',
    route: attendanceRoute,
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
