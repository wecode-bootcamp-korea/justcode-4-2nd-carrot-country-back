const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const keyError = require("../middleware/keyError");
const multer = require("multer");
const productController = require("../controllers/productController");
const upload = multer({
  dest: "../database/uploads",
});

//로그인 안해도 접근가능
router.get("/best", productController.getBestProducts);

router.use(
  authorization.getUserIdByVerifyToken,
  authorization.getUserDistrictInfo
);
router.get("", productController.getProductList);
router.get("/:productId", productController.getProductDetail);
router.delete("", keyError.validDeleteProduct, productController.deleteProduct);
router.post("", keyError.validCreateProduct, productController.createProduct);
// router.post("/images",upload.array("imageURLs, 10"),productController.createProductImages)

// router.post(
//   "/uploadTest",
//   upload.array("imageURLs", 10),
//   productController.uploadImageURLs
// );
// router.patch("", keyError.validUpdateProduct, productController.updateProduct);

module.exports = router;
