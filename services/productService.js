const productDao = require("../models/productDao");

const createProduct = async (
  title,
  categoryId,
  cityId,
  districtId,
  price,
  description,
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

const createProductImages = async (path) => {
  const images = await productDao.createProductImages(path);
};

const deleteProduct = async (productId, userId) => {
  await productDao.deleteProduct(productId, userId);
};

const getProductList = async (districtId, cityId) => {
  try {
    return await productDao.getProductList(districtId, cityId);
  } catch (error) {
    console.log(error);
  }
};

const getBestProducts = async () => {
  try {
    return await productDao.getBestProducts();
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (productId) => {
  try {
    return await productDao.getProductDetail(productId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProductIdBycreateAt,
  // uploadProductImages,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
  createProductImages,
};
