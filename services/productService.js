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
  return await productDao.createProduct(
    title,
    categoryId,
    cityId,
    districtId,
    price,
    description,
    userId
  );
};

const getProductIdBycreateAt = async (userId) => {
  const getProductIdBycreateAt = await productDao.getProductIdBycreateAt(
    userId
  );
  return getProductIdBycreateAt[0].id;
};

const createProductImages = async (path, productId) => {
  await productDao.createProductImages(path, productId);
};

const updateProduct = async (
  userId,
  productId,
  title,
  categoryId,
  price,
  description
) => {
  await productDao.updateProduct(
    userId,
    productId,
    title,
    categoryId,
    price,
    description
  );
};

const updateProductImages = async(path, productId) => {
  await productDao.updateProductImages(path, productId);
};

const deleteProduct = async (productId, userId) => {
  await productDao.deleteProduct(productId, userId);
};

const getProductList = async (districtId, cityId) => {
  return await productDao.getProductList(districtId, cityId);
};

const getBestProducts = async () => {
  return await productDao.getBestProducts();
};

const getProductDetail = async (productId) => {
  return await productDao.getProductDetail(productId);
};

const productInterested = async (userId, productId) => {
  const dataCheck = await productDao.duplicateInterested(userId, productId);
  if (dataCheck.length !== 0) {
    const err = new Error("ALREADY LIKED");
    err.statusCode = 400;
    throw err;
  }
  await productDao.productInterested(userId, productId);
};

const productUnInterested = async (userId, productId) => {
  const dataCheck = await productDao.duplicateInterested(userId, productId);
  if (dataCheck.length === 0) {
    const err = new Error("ALREADY UNLIKED");
    err.statusCode = 400;
    throw err;
  }
  return await productDao.productUnInterested(userId, productId);
};

module.exports = {
  createProduct,
  getProductIdBycreateAt,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
  createProductImages,
  productInterested,
  productUnInterested,
  updateProduct,
  updateProductImages
};
