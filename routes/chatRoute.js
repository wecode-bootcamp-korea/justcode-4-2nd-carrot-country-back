const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.getRooms);
router.get("/:roomId", chatController.getChats);
module.exports = router;
