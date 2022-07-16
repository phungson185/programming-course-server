const httpStatus = require('http-status');
const cloudinary = require('cloudinary').v2;
const config = require('./../config/config');
const ApiError = require('../utils/ApiError');
cloudinary.config(config.cloudinary);
const upload = async (files) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(files, {
      upload_preset: 'tuantea',
      resource_type: 'auto',
    });
    return uploadResponse.url;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Malformed');
  }
};

module.exports = {
  upload,
};
