const infoService = require("../services/infoService");

const errorGenerator = require("../utils/errorGenerator");

const getInfos = async (req, res, next) => {
  try {
    const districtInfos = await infoService.getInfos();
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

const getInfoComments = async (req, res, next) => {
  try {
    const { infoId } = req.params;
    if (!infoId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const infoComments = await infoService.getInfoComments(Number(infoId));
    return res.status(200).json({ message: "SUCCESS", infoComments });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getInfos, getInfo, getSearchInfos, getInfoComments };
