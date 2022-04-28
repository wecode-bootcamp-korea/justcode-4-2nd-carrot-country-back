const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const infoController = require("../controllers/infoController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `database/uploads/`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});
const upload = multer({
  storage: storage,
});

// GET
router.get("/:infoId", infoController.getInfo);
router.get("/search/info", infoController.getSearchInfos);

router.post(
  "/:infoId/liked",
  authorization.getUserIdByVerifyToken,
  infoController.postInfoLike
);

router.delete(
  "/:infoId/unliked",
  authorization.getUserIdByVerifyToken,
  infoController.deleteInfoLike
);

router.use(
  authorization.getUserIdByVerifyToken,
  authorization.getUserDistrictInfo
);
router.get("/", infoController.getInfos);

// 동네정보 등록 API
router.post("",infoController.createInfo);
router.post("/images", upload.array("images"),function(req, res, next) {
  next();
}, infoController.createInfoImages)
router.delete("/:infoId",infoController.deleteInfo);

//댓글정보 가져오기
router.get("/:infoId/comment",
infoController.getinfoComments)

//댓글 등록하기
router.post(
  "/:infoId/comment",
  authorization.getUserIdByVerifyToken,
  infoController.createComment
);

module.exports = router;
