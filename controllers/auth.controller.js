const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const {
  authService,
  userService,
  tokenService,
  emailService,
  attendanceService,
  courseService,
  categoryService,
} = require('../services');

const register = catchAsync(async (req, res) => {
  const code = await emailService.sendVerificationEmail(req.body.email);
  const user = await userService.createUser(req.body, code);
  res.send(new Response(httpStatus.OK, user));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send(new Response(httpStatus.OK, { user, tokens }));
});

const forgotPassword = catchAsync(async (req, res) => {
  try {
    const newPassword = Math.random().toString(36).substring(2, 15);
    await emailService.sendResetPasswordEmail(req.body.email, newPassword);
    await authService.forgotPassword(req.body.email, newPassword);
    res.send(new Response(httpStatus.OK, null, 'New password sent'));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error });
  }
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.user._id, req.body.password);
  res.send(new Response(httpStatus.OK, null, 'Password reset'));
});

const verifyEmail = catchAsync(async (req, res) => {
  const user = await authService.verifyEmail(req.body.email, req.body.code);
  res.send(new Response(httpStatus.OK, user, 'Email verified'));
});

const getProfile = catchAsync(async (req, res) => {
  const { user } = req;
  const attendances = await attendanceService.getAttendanceByUserId(user.id);
  let courseOfUser = [];
  await Promise.all(
    attendances.map(async (attendance) => {
      let course = {};
      let { _id, name, description, categoryId, image } =
        await courseService.getCourseById(attendance.courseId);
      course.id = _id;
      course.name = name;
      course.description = description;
      course.categoryId = categoryId;
      course.image = image;
      if (attendance.achievement) {
        course.achievement = attendance.achievement;
      }
      courseOfUser.push(course);
    }),
  );
  res.send(
    new Response(httpStatus.OK, { user, courseOfUser }),
  );
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getProfile,
};
