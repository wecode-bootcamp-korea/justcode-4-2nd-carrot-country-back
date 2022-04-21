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
const getProductIdBycreateAt = async (userId) => {
  const getProductIdBycreateAt = await productDao.getProductIdBycreateAt(
    userId
  );
  return getProductIdBycreateAt[0].id;
};

const uploadProductImages = async (productId, imageURLsAddr) => {
  const uploadProductImages = await productDao.uploadProductImages(
    productId,
    imageURLsAddr
  );
};

const deleteProduct = async (productId, userId) => {
  await productDao.deleteProduct(productId, userId);
};

const getProductList = async (districtId) => {
  try {
    return await productDao.getProductList(districtId);
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (product_id) => {
  try {
    return await productDao.getDetailList(product_id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProductIdBycreateAt,
  uploadProductImages,
  deleteProduct,
  getProductList,
};
