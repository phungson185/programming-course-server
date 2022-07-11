const httpStatus = require('http-status');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const categoryService = require('./category.service');

const getCourses = async (filters, options) => {
  return await Course.paginate(filters, options);
};

const createCourse = async (courseBody) => {
  const category = await categoryService.getCategoryById(courseBody.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return Course.create(courseBody);
};

const getCourseById = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Course.findById(id);
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
};
