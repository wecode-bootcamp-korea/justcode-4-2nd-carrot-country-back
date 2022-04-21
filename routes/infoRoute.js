const express = require("express");
const router = express.Router();

const infoController = require("../controllers/infoController");

// GET
router.get("/", infoController.getInfos);
router.get("/:infoId", infoController.getInfo);
router.get("/search/info", infoController.getSearchInfos);

module.exports = router;
