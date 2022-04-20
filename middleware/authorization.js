const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const getUserIdByVerifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "token is not provided" });
  }
};

const getUserDistrictInfo = async (req, res, next) =>{
      const userId = req.userId;
      if (req.userId){
      const userInfo = await userDao.getUserDistrictInfo(userId)
      req.cityId = userInfo[0].cityId
      req.districtId = userInfo[0].districtId
      next();
      } else {
        res.status(403).json({message : "not our member"})
      }
};


module.exports = { getUserIdByVerifyToken, getUserDistrictInfo };