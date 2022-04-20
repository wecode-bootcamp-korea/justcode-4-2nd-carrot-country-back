const productDao = require("../models/productDao");

const createProduct = async (
  title,
  categoryId,
  cityId,
  districtId,
  price,
  description,
  viewCount,
  userId
) => {
  try {
    return await productDao.createProduct(
      title,
      categoryId,
      cityId,
      districtId,
      price,
      description,
      viewCount,
      userId
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createProduct };
