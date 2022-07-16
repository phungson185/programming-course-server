const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { dashboardService } = require('../services');

const getDashboard = catchAsync(async (req, res) => {
  const result = await dashboardService.getDashboard();
  res.send(new Response(httpStatus.OK, result));
});

module.exports = {
  getDashboard,
};
