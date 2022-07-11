const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { courseService } = require('../services');

const addCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.send(new Response(httpStatus.OK, course));
});

module.exports = {
  addCourse,
};
