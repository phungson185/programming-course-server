const httpStatus = require('http-status');
const { Attendance } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { courseService, userService } = require('./');

const createAttendance = async (attendanceBody) => {
  const course = await courseService.getCourseById(attendanceBody.courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  const user = await userService.getUserById(attendanceBody.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (course && user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Attendance already exists');
  }
  return Attendance.create(attendanceBody);
};

module.exports = {
  createAttendance,
};
