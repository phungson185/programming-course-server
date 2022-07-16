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
  ]).lookup({
    from: 'categories',
    localField: '_id',
    foreignField: '_id',
    as: 'category',
    
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
  const users = await Attendance.find({ courseId: id }).count();
  const course = await Course.findById(id);

  return users;
};

module.exports = {
  getDashboard,
};
