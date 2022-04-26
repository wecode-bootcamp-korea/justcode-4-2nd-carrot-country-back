const infoService = require("../services/infoService");
const errorGenerator = require("../utils/errorGenerator");

const getInfos = async (req, res, next) => {
  try {
    const districtId = req.districtId;
    const cityId = req.cityId;
    if (!districtId || !cityId) {
      const err = new Error("NO DISTRICT INFO");
      err.statusCode = 400;
      throw err;
    }
    const districtInfos = await infoService.getInfos(cityId, districtId);
    return res.status(200).json({ message: "SUCCESS", districtInfos });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getInfo = async (req, res, next) => {
  try {
    const { infoId } = req.params;
    if (!infoId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const districtInfo = await infoService.getInfo(Number(infoId));
    return res.status(200).json({ message: "SUCCESS", districtInfo });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getSearchInfos = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const districtInfos = await infoService.getSearchInfos(keyword);
    return res.status(200).json({ message: "SUCCESS", districtInfos });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postInfoLike = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { infoId } = req.params;

    await infoService.postInfoLike(userId, Number(infoId));
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteInfoLike = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { infoId } =req.params;
    await infoService.deleteInfoLike(userId, Number(infoId));
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const createComment = async (req, res, next) =>{
try{
  const userId = req.userId;
  const { infoId } = req.params;
  const { comment } = req.body
  await infoService.createComment(userId, Number(infoId), comment)
  return res.status(200).json({ message: "SUCCESS" });
 } catch(err){
   console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
 }
}

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment
};
