const express = require("express");
const router = express.Router(); // express 라우팅 기능을 사용하기 위해서 router 객체가 필요합니다.

const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const infoRoute = require("./infoRoute");
const chatRoute = require("./chatRoute");
const areaRoute = require("./areaRoute");

router.use("/users", userRoute);
// router.use("/products", productRoute);
router.use("/infos", infoRoute);
// router.use("/chats", chatRoute);
router.use("/area", areaRoute);

module.exports = router; // 이렇게 내보낸 router 는 express app 의 미들웨어로 사용됩니다.
