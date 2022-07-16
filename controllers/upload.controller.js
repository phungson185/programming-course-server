const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { uploadService } = require('../services');

const upload = catchAsync(async (req, res) => {
  const courses = await uploadService.upload(req.file.path);
  res.status(httpStatus.OK).send({ url: courses });
});

module.exports = {
  upload,
};
