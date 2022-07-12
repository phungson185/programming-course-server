const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { adminService } = require('../services');

const getInfo = catchAsync(async (req, res) => {
  const result = await adminService.getInfo(req.params.id);
  res.status(httpStatus.OK).send({
    result: result,
  });
});

module.exports = {
  getInfo,
};
