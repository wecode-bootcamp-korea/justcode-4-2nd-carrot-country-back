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
    const { title, categoryId, price, description, viewCount, imageURLs } =
      req.body;
    const createProduct = await productService.createProduct(
      title,
      categoryId,
      cityId,
      districtId,
      price,
      description,
      viewCount,
      userId
    );
    const productId = await productService.getProductIdBycreateAt(userId);
    //폴더를 지정하거나 생성
    // try {
    //   fs.readdirSync(`../database/uploads/productId${productId}`);
    // } catch (error) {
    //   console.log(
    //     `../database/uploads/productId${productId} 폴더를 생성합니다`
    //   );
    //   fs.mkdirSync(
    //     `../database/uploads/productId${productId}`,
    //     { recursive: true },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }

    // const upload = multer({
    //   storage: multer.diskStorage({
    //     // 업로드된 이미지 저장 경로 지정
    //     destination(req, file, cb) {
    //       cb(null, `../database/uploads/productId${productId}`);
    //     },
    //     // 업로드된 이미지 파일 이름 지정
    //     filename(req, file, cb) {
    //       const ext = path.extname(file.originalname);
    //       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    //     },
    //   }),
    //   // 파일 크기 제한 10MB
    //   limits: { fileSize: 10 * 1024 * 1024 },
    //   // form태그 name은 "imageURLs"로 일치시켜야 파일을 받을 수 있습니다.
    // }).array("imageURLs");

    // let urlArr = new Array();
    // for (let i = 0; i < imageURLs.length; i++) {
    //   urlArr.push(`/imageURLs/${imageURLs[i].filename}`);
    //   console.log("누구세요", urlArr);
    // }
    // console.log("누구세요22", urlArr);

    // let jsonUrl = JSON.stringify(urlArr);
    // console.log("누구세요33", jsonUrl);

    // upload(req, res, function (err) {
    //   console.log("여기..있니?", req.body.imageURLs);
    //   console.log("여기..있니?", req.files);
    //   if (err) {
    //     return res.status(400).json({ message: "INVALID_FILE" });
    //   }
    // });
    const imageURLsAddr = `../database/uploads/productId${productId}`;

    await productService.uploadProductImages(productId, imageURLsAddr);
    return res.status(201).json({
      message: "SUCCESS : CREATE PRODUCT",
      imageURLsAddr: imageURLsAddr,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

// const uploadImageURLs = async (req, res) =>{
//   const image = req.headers.files
//   console.log("file누구냐", req.headers.files)
//   if (image === undefined) {
//     return res.status(400).json({ message : "no image"})
//   }
//   res.status(200).json({message : "IMAGE_UPLOAD_SUCCESS", image})
// };

const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("!나와라 유저아이디", userId);
    const { productId } = req.body;
    const deleteProduct = await productService.deleteProduct(userId, productId);
    return res.status(201).json({ message: "SUCCESS : DELETE A Product" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const districtId = req.districtId;
    const productList = await productService.getProductList(districtId);
    return res.status(201).json({ productList: productList });
  } catch (error) {
    console.log(error);
  }
};

// createdAt , updatedAt, distrct, city, price, chatrooms개수, liked개수 , 사진, 제목
// const getProductDetail = async (req, res) => {
//   try {
//     const productId = req.url.split("/")[1];
//     const detail = await producService.getProductDetail(productId);

//     return res.status(200).json(detail);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  createProduct,
  deleteProduct,
  getProductList,
};
