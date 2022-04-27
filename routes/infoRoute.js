const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const infoController = require("../controllers/infoController");

// GET
router.get("/:infoId", infoController.getInfo);
router.get("/search/info", infoController.getSearchInfos);
//POST

router.use(
  authorization.getUserIdByVerifyToken,
  authorization.getUserDistrictInfo
);
router.get("/", infoController.getInfos);

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
//CREATE COMMENT
router.post(
  "/:infoId/comment",
  authorization.getUserIdByVerifyToken,
  infoController.createComment
);

module.exports = router;
