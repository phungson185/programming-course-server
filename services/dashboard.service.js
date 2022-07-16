const httpStatus = require('http-status');
const { User, Category, Attendance, Course } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const getDashboard = async () => {
  const users = await User.find().count();

  const courses = await Course.find().count();

  const attendances = await Attendance.find().count();

  const categories = await Category.find().count();

  const countCourseByCategoryId = await Course.aggregate([
    { $group: { _id: '$categoryId', count: { $sum: 1 } } },
  ])
    .lookup({
      from: 'categories',
      localField: '_id',
      foreignField: '_id',
      as: 'category',
    })
    .project({
      _id: 0,
      category: { $arrayElemAt: ['$category.name', 0] },
      count: 1,
    });

  const res = await Promise.all(countCourseByCategoryId);

  return {
    chartInfo: res,
    countUser: users,
    countCourse: courses,
    countAttendance: attendances,
    countCategory: categories,
  };
};
const getInfoCourse = async (id) => {
  let courseInfo = [];
  courseInfo = await Attendance.aggregate([
    {
      $group: {
        _id: '$courseId',
        count: { $sum: 1 },
        averageAchievement: { $avg: '$achievement' },
        minAchievement: { $min: '$achievement' },
        maxAchievement: { $max: '$achievement' },
      },
    },
  ])
    .lookup({
      from: 'courses',
      localField: '_id',
      foreignField: '_id',
      as: 'course',
    })
    .project({
      _id: 0,
      course: { $arrayElemAt: ['$course.name', 0] },
      count: 1,
      minAchievement: 1,
      maxAchievement: 1,
      averageAchievement: 1,
    });

  return courseInfo;
};

module.exports = {
  getDashboard,
  getInfoCourse,
};
