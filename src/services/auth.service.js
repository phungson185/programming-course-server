const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!user.isEmailVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email is not verified');
  }
  return user;
};

const resetPassword = async (userId, newPassword) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

const verifyEmail = async (email, code) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.code !== code) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Code is not valid');
  }
  await userService.updateUserById(user.id, { isEmailVerified: true });
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
  verifyEmail,
};
