const productService = require("../services/productService");
const errorGenerator = require("../utils/errorGenerator");
const express = require("express");
const multer = require("multer");
const path = require("path");

//매물 등록생성
const createProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const cityId = req.cityId;
    const districtId = req.districtId;
    const { title, categoryId, price, description } = req.body;
    await productService.createProduct(
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
      message: "SUCCESS CREATE PRODUCT",
      productId: productId,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//매물 이미지 저장 API
const createProductImages = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = await productService.getProductIdBycreateAt(userId);
    const images = req.files;
    const filename = images.map((image) => image.filename);
    if (images === undefined) {
      const err = new Error("NO IMAGE");
      err.statusCode = 400;
      throw err;
    }
    await productService.createProductImages(filename, productId);
    res.status(200).json({
      message: "IMAGE_UPLOAD_SUCCESS",
      imageURLs: filename,
      productId: productId,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//매물 수정하기 API
const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.url.split("/")[1]);
    const { title, categoryId, price, description } = req.body;
    await productService.updateProduct(
      productId,
      title,
      categoryId,
      price,
      description
    );
    res.status(200).json({ message: "SUCCESS UPDATE" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//동네매물 이미지 등록 API
const updateProductImages = async (req, res, next) => {
  try {
    const productId = Number(req.url.split("/")[1]);
    const updateImages = req.files;
    const filename = updateImages.map((image) => image.filename);
    if (updateImages === undefined) {
      const err = new Error("NO IMAGE");
      err.statusCode = 400;
      throw err;
    }
    await productService.updateProductImages(filename, productId);
    res.status(200).json({
      message: "IMAGE_UPDATED_SUCCESS",
      imageURLs: filename,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//( 매물 삭제 API
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    await productService.deleteProduct(productId);
    return res.status(201).json({ message: "SUCCESS DELETE A Product" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//매물 list 가져오기 (해당 district만 / 업데이트순)
const getProductList = async (req, res) => {
  try {
    const districtId = req.districtId;
    const cityId = req.cityId;
    if (!districtId || !cityId) {
      const err = new Error("NO DISTRICT INFO");
      err.statusCode = 400;
      throw err;
    }
    const productList = await productService.getProductList(districtId, cityId);
    if (productList.length === 0) {
      const err = new Error("NO REGISTERD PRODUCT IN THIS DISTRICT");
      err.statusCode = 400;
      throw err;
    }
    return res.status(201).json({ productList: productList });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

// 판매이력 매물가져오기 (user별)
const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const sellingItem = await productService.getProductsByUserId(userId);
    return res.status(201).json({ sellingItem: sellingItem });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 인기 중고매물 가져오기 (인증/인가 불필요 / viewCount 내림차순)
const getBestProducts = async (req, res) => {
  try {
    const { cityId, districtId } = req.query;
    // district 만 넘어오는 경우는 err
    if (!cityId && districtId) {
      const err = new Error("KEY ERROR");
      err.statusCode = 400;
      throw err;
    }
    //city 정보만 선택
    if (cityId && !districtId) {
      const bestProducts = await productService.getBestProductsBycity(
        Number(cityId)
      );
      return res.status(200).json({ message: "SUCCESS", bestProducts });
    }
    //city & district 정보 둘다 선택
    if (cityId && districtId) {
      const bestProducts = await productService.getBestProductsBycityNDistrict(
        Number(cityId),
        Number(districtId)
      );
      return res.status(200).json({ message: "SUCCESS", bestProducts });
    }
    if (!cityId && !districtId) {
      const bestProducts = await productService.getBestProducts();
      return res.status(201).json({ message: "SUCCESS", bestProducts });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 매물 상세페이지 가져오기
const getProductDetail = async (req, res) => {
  try {
    const productId = req.url.split("/")[1];
    const product = await productService.getProductDetail(productId);
    await productService.updateViewCount(product.id, product.viewCount);
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//매물 관심있어요 등록 API
const productInterested = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = Number(req.url.split("/")[1]);
    await productService.productInterested(userId, Number(productId));
    return res.status(200).json({ message: "LIKED SUCCESS" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//매물 관심있어요 취소 API
const productUnInterested = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = Number(req.url.split("/")[1]);
    if (!productId) {
      const err = new Error("INVALID URL");
      err.statusCode = 400;
      throw err;
    }
    await productService.productUnInterested(userId, Number(productId));
    return res.status(200).json({ message: "UNLIKED SUCEESS" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 매물 검색정보 가져오기 API (타이틀 기준 검색)
const getSearchProduct = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }
    const searchProducts = await productService.getSearchProduct(keyword);
    if (searchProducts.length === 0) {
      const err = new Error("NO SEARCH RESULTS");
      err.statusCode = 400;
      throw err;
    }
    return res.status(200).json({ message: "SUCCESS", searchProducts });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
  createProductImages,
  productInterested,
  productUnInterested,
  updateProductImages,
  getSearchProduct,
  getProductsByUserId,
};
