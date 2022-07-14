const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { uploadService } = require('../services');

const upload = catchAsync(async (req, res) => {
  console.log(req.body.files);
  const courses = await uploadService.upload(req.body.files);
  res.status(httpStatus.OK).send({ url: courses });
});

module.exports = {
  upload,
};
