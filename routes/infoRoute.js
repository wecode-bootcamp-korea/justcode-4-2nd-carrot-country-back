const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const infoController = require("../controllers/infoController");

// GET
router.get("/", infoController.getInfos);
router.get("/:infoId", infoController.getInfo);
router.get("/search/info", infoController.getSearchInfos);
//POST
router.post(
  "/:infoId/liked",
  authorization.getUserIdByVerifyToken,
  infoController.postInfoLike
);
//DELETE
router.delete(
  "/:infoId/unliked",
  authorization.getUserIdByVerifyToken,
  infoController.deleteInfoLike
);

module.exports = router;
