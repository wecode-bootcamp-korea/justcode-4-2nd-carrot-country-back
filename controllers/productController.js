const productService = require("../services/productService");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const cityId = req.cityId;
    const districtId = req.districtId;
    const { title, categoryId, price, description, imageURLs } = req.body;
    const createProduct = await productService.createProduct(
      title,
      categoryId,
      cityId,
      districtId,
      price,
      description,
      userId
    );
    const productId = await productService.getProductIdBycreateAt(userId);
    return res.status(201).json({
      message: "SUCCESS : CREATE PRODUCT",
      productId: productId,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const createProductImages = async (req, res, next) => {
  const images = req.files;
  console.log("images야","images")
  const path = images.map((image) => image.path);
  if (images === undefined) {
    return res.status(400).json({ message: "no image" });
  }
  const uploadImages = await productService.createProductImages(path);
  res.status(200).json({ message: "IMAGE_UPLOAD_SUCCESS", path });
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    await productService.deleteProduct(userId, productId);
    return res.status(201).json({ message: "SUCCESS DELETE A Product" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const districtId = req.districtId;
    const cityId = req.cityId;
    const productList = await productService.getProductList(districtId, cityId);
    return res.status(201).json({ productList: productList });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const getBestProducts = async (req, res) => {
  try {
    const bestProduct = await productService.getBestProducts();
    return res.status(201).json({ bestProduct: bestProduct });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const productId = req.url.split("/")[1];
    const detail = await productService.getProductDetail(productId);
    return res.status(200).json({ detail: detail });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
  createProductImages,
};
