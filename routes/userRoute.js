const express = require("express");
const router = express.Router();
const keyError = require("../middleware/keyError");
const userController = require("../controllers/userController");
const authorization = require("../middleware/authorization")

router.post("/signup", keyError.validSignup, userController.signup);
router.post("/login",authorization.getUserDistrictInfo, keyError.validLogin, userController.login);

module.exports = router;
