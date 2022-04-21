const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const keyError = require("../middleware/keyError");
const multer = require("multer");
const productController = require("../controllers/productController");

// const upload = multer({
//   dest: "../databse/uploads",
// });

router.use(
  authorization.getUserIdByVerifyToken,
  authorization.getUserDistrictInfo
);

router.get("", productController.getProductList);
// router.get("", productController.getProductDetail);
router.delete("", keyError.validDeleteProduct, productController.deleteProduct);
// router.post("", keyError.validCreateProduct, productController.createProduct);

// router.post(
//   "/uploadTest",
//   upload.array("imageURLs", 10),
//   productController.uploadImageURLs
// );
// router.patch("", keyError.validUpdateProduct, productController.updateProduct);

module.exports = router;
