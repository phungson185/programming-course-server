const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const getCategories = async () => {
  return await Category.find();
}

const createCategory = async (categoryBody) => {
  return Category.create(categoryBody);
};

const editCategory = async (id, body) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, body);
  await category.save();
  return category;
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

const getCategoryById = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Category.findById(id);
  }
};

module.exports = {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
