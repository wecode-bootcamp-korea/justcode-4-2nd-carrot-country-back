const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// GET
router.get("/", categoryController.getCategories);

module.exports = router;
