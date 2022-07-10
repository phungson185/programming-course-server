const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const authAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!req.headers.authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
  }

  const decoded = jwt.verify(token, config.jwt.secret);
  if (decoded) {
    let user = await userService.getUserById(decoded.sub);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (decoded.exp < Date.now() / 1000) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
    }

    if (user.role !== 'admin') {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not admin');
    }

    req.user = user;
  }
  next();
};

module.exports = authAdmin;
