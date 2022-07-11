const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const pick = require('../utils/pick');
const { courseService } = require('../services');

const getCourses = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['name', 'categoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const courses = await courseService.getCourses(filters, options);
  res.status(httpStatus.OK).send(courses);
});

const getCourseById = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);
  res.send(new Response(httpStatus.OK, course));
});

const addCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.send(new Response(httpStatus.OK, course));
});

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
};
