const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { attendanceService } = require('../services');

const addAttendance = catchAsync(async (req, res) => {
  const attendance = await attendanceService.createAttendance(req.body);
  res.send(new Response(httpStatus.OK, attendance));
});

module.exports = {
    addAttendance,
};
