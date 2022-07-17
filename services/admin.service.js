const httpStatus = require('http-status');
const { User, Category, Attendance, Course } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const getInfo = async (id) => {
  var countUser = 0;
  const courses = await Course.find({ categoryId: id });
  const courseCount = await Course.find({ categoryId: id }).count();
  for (let i = 0; i < courseCount; i++) {
    const users = await Attendance.find({ courseId: courses[i]._id }).count();
    countUser += users;
  }
  const result = {
    courseCount: courseCount,
    countUser: countUser,
  };
  return result;
};
const getInfoCourse = async (id) => {
  const usersNumber = await Attendance.find({ courseId: id }).count();
  const course = await Course.findById(id);
  const statistical = await Attendance.aggregate([
    // { $match: { author: id } },
    {
      $group: {
        _id: '$courseId',
        minScore: { $min: '$achievement' },
        maxScore: { $max: '$achievement' },
        averageScore: { $avg: '$achievement' },
      },
    },
  ]);
  const result = {
    usersNumber,
    course,
    statistical,
  };
  return result;
};

module.exports = {
  getInfo,
  getInfoCourse,
};
