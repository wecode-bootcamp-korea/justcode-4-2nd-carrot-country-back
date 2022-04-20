const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const keyError = require("../middleware/keyError");
const productController = require("../controllers/productController");

router.use(authorization.getUserIdByVerifyToken, authorization.getUserDistrictInfo);

// router.get("", productontroller.getProduct);
router.post("", keyError.validCreateProduct, productontroller.createProduct);
// router.patch("", keyError.validUpdateProduct, productController.updateProduct);
// router.delete("", keyError.validDeleteProduct, cartController.deleteProduct);

module.exports = router;