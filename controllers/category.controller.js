const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Response = require('../utils/Response');
const { categoryService } = require('../services');

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.send(new Response(httpStatus.OK, categories));
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.send(new Response(httpStatus.OK, category));
});

const addCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.send(new Response(httpStatus.OK, category));
});

const editCategory = catchAsync(async (req, res) => {
  const category = await categoryService.editCategory(req.params.id, req.body);
  res.send(new Response(httpStatus.OK, category));
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  res.send(new Response(httpStatus.OK, category));
});

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
};
