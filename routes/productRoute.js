const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const keyError = require("../middleware/keyError");
const multer = require("multer");
const productController = require("../controllers/productController");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `database/uploads/`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});
const upload = multer({
  storage: storage,
});

//로그인 안해도 접근가능
router.get("/best", productController.getBestProducts);
router.get("/:productId", productController.getProductDetail);
router.get("/search/product", productController.getSearchProduct);

//지역미들웨어는 없어도 작동가능
router.use(authorization.getUserIdByVerifyToken);
router.post(
  "/:productId/interested",
  // authorization.getUserIdByVerifyToken,
  keyError.validProductInterested,
  productController.productInterested
);

router.delete(
  "/:productId/unInterested",
  // authorization.getUserIdByVerifyToken,
  productController.productUnInterested
);

router.patch("/:productId", productController.updateProduct);
router.patch(
  "/:productId/updateImages",
  upload.array("updateImages"),
  function (req, res, next) {
    next();
  },
  productController.updateProductImages
);

//토큰(유저정보), 지역 미들웨어 모두 필요
router.use(
  authorization.getUserIdByVerifyToken,
  authorization.getUserDistrictInfo
);

router.post("", keyError.validCreateProduct, productController.createProduct);
router.post(
  "/images",
  upload.array("images"),
  function (req, res, next) {
    next();
  },
  productController.createProductImages
);

router.get("", productController.getProductList);
router.delete("", keyError.validDeleteProduct, productController.deleteProduct);

router.patch("/:productId", productController.updateProduct);
router.patch(
  "/:productId/updateImages",
  upload.array("updateImages"),
  function (req, res, next) {
    next();
  },
  productController.updateProductImages
);

router.post(
  "/:productId/interested",
  keyError.validProductInterested,
  productController.productInterested
);

router.delete(
  "/:productId/unInterested",
  productController.productUnInterested
);
module.exports = router;
