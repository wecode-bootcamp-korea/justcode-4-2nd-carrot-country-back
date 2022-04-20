const productDao = require("../models/productDao");

const createProduct = async (
  title,
  categoryId,
  cityId,
  districtId,
  price,
  description,
  viewCount,
  userId,
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

const getProductIdBycreateAt = async(userId) => {
 const getProductIdBycreateAt = await productDao.getProductIdBycreateAt(userId)
 return getProductIdBycreateAt[0].id
}

const uploadProductImages = async(productId, imageURLsAddr) => {
  const uploadProductImages = await productDao.uploadProductImages(productId, imageURLsAddr)
}

module.exports = { createProduct, getProductIdBycreateAt, uploadProductImages };
