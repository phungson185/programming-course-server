const httpStatus = require('http-status');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const categoryService = require('./category.service');
const attendanceService = require('./attendance.service');

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

const getCourse = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return await Course.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
    ])
      .lookup({
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      })
      .project({
        categoryId: 0,
      });
  }
};

const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  Object.assign(course, updateBody);
  await course.save();
  return course;
};

const checkAnswer = async (userId, courseId, answerBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const attendance = await attendanceService.getAttendanceByUserIdAndCourseId(
    userId,
    courseId,
  );
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }

  const questions = course.quiz.questions;

  let correct = 0;

  questions.forEach((question, index) => {
    if (question.correctAnswer === answerBody.answers[index]) {
      correct++;
    }
  });

  const achieved = (correct / questions.length) * 10;

  attendance.achievement = achieved;
  await attendance.save();

  return {
    userId: userId,
    courseId: courseId,
    achievement: achieved,
  };
};

module.exports = {
  getCourses,
  getCourse,
  getCourseById,
  createCourse,
  checkAnswer,
  updateCourseById,
};
