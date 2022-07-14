const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { userService } = require('../services');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.send(new Response(httpStatus.OK, users));
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.send(new Response(httpStatus.OK, user));
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(new Response(httpStatus.OK, user));
});

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
};
