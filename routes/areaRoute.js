const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");

// GET
router.get("/", areaController.getArea);
router.get("/city", areaController.getCities);
router.get("/district/:cityId", areaController.getDistricts);

module.exports = router;
