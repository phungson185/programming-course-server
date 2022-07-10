const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { categoryService } = require('../services');
const logger = require('../config/logger');

const addCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.send(new Response(httpStatus.OK, category));
});

const editCategory = catchAsync(async (req, res) => {
  logger.info(`Editing category ${req.param.id}`);
  const category = await categoryService.editCategory(req.params.id, req.body);
  res.send(new Response(httpStatus.OK, category));
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  res.send(new Response(httpStatus.OK, category));
});

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
};