const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { uploadService } = require('../services');

const upload = catchAsync(async (req, res) => {
  const file = await uploadService.upload(req.file.path);
  res.send(new Response(httpStatus.OK, 'File uploaded successfully', file));
});

module.exports = {
  upload,
};
