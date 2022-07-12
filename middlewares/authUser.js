const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const authUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!req.headers.authorization) {
    next(new ApiError(httpStatus.UNAUTHORIZED, 'No token provided'));
  }

  const decoded = jwt.verify(token, config.jwt.secret);
  if (decoded) {
    let user = await userService.getUserById(decoded.sub);
    if (!user) {
      next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
    }

    if (decoded.exp < Date.now() / 1000) {
      next(new ApiError(httpStatus.UNAUTHORIZED, 'Token expired'));
    }

    req.user = user;
  }
  next();
};

module.exports = authUser;
