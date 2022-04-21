const express = require("express");
const router = express.Router();

const infoController = require("../controllers/infoController");

// GET
router.get("/:infoId", infoController.getInfo);

module.exports = router;
