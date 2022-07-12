const httpStatus = require('http-status');
const { Attendance } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const courseService = require('./course.service');
const userService = require('./user.service');

const createAttendance = async (attendanceBody) => {
  // const course = await courseService.getCourseById(attendanceBody.courseId);
  // if (!course) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  // }
  const user = await userService.getUserById(attendanceBody.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const attendance = await Attendance.findOne({
    userId: attendanceBody.userId,
    courseId: attendanceBody.courseId,
  });
  if (attendance) {
    throw new ApiError(httpStatus.CONFLICT, 'Attendance already exists');
  }
  return Attendance.create(attendanceBody);
};

const getAttendanceById = async (attendanceId) => {
  if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid attendance id');
  }
  const attendance = await Attendance.findById(attendanceId);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return attendance;
};

const getAttendanceByUserId = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id');
  }
  const attendance = await Attendance.find({ userId });
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return attendance;
};

const getAttendanceByCourseId = async (courseId) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid course id');
  }
  const attendance = await Attendance.find({ courseId });
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return attendance;
};

const getAttendanceByUserIdAndCourseId = async (userId, courseId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id');
  }
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid course id');
  }
  const attendance = await Attendance.findOne({ userId, courseId });
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  return attendance;
};

module.exports = {
  createAttendance,
  getAttendanceById,
  getAttendanceByUserId,
  getAttendanceByCourseId,
  getAttendanceByUserIdAndCourseId,
};
