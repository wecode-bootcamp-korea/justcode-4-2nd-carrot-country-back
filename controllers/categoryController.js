const categoryService = require("../services/categoryService");

const errorGenerator = require("../utils/errorGenerator");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ message: "SUCCESS", categories });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getCategories };
