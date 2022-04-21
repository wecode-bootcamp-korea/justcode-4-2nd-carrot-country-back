const categoryDao = require("../models/categoryDao");

const getCategories = async () => {
  return await categoryDao.getCategories();
};

module.exports = { getCategories };
