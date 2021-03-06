const { version } = require('../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Programming course API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Local server',
    },
    {
      url: `https://programming-course-server.herokuapp.com/v1`,
      description: 'Heroku server',
    }
  ],
};

module.exports = swaggerDef;
