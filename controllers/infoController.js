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
    await infoService.updateViewCount(districtInfo.id, districtInfo.viewCount);
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
    if (districtInfos.length === 0) {
      const err = new Error("NO SEARCH RESULTS");
      err.statusCode = 400;
      throw err;
    }
    return res.status(200).json({ message: "SUCCESS", districtInfos });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getinfoComments = async (req, res, next) => {
  try {
    const infoId = req.url.split("/")[1];
    const infoComments = await infoService.getinfoComments(Number(infoId));
    return res.status(200).json({ message: "SUCCESS", infoComments });
  } catch (err) {
    console.log(err);
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
    const { infoId } = req.params;
    await infoService.deleteInfoLike(userId, Number(infoId));
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const createComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { infoId } = req.params;
    const { comment } = req.body;
    await infoService.createComment(userId, Number(infoId), comment);
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const createInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cityId = req.cityId;
    const districtId = req.districtId;
    const { title, content } = req.body;
    await infoService.createInfo(userId, cityId, districtId, title, content);
    return res.status(201).json({ message: "SUCCESS CREATE DISTRICT-INFO" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteInfo = async (req, res, next) => {
  try {
    const infoId = req.url.split("/")[1];
    await infoService.deleteInfo(infoId);
    return res.status(201).json({ message: "SUCCESS DELETE DISTRICT-INFO" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.url.split("/")[1];
    console.log("commentId", commentId);
    return await infoService.deleteComment(commentId);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const createInfoImages = async (req, res, next) => {
  try {
    const userId = req.userId;
    const infoId = await infoService.getinfoIdBycreateAt(userId);
    const images = req.files;
    const filename = images.map((image) => image.filename);
    if (images === undefined) {
      const err = new Error("NO IMAGE");
      err.statusCode = 400;
      throw err;
    }
    await infoService.createInfoImages(filename, infoId);
    res.status(200).json({
      message: "IMAGE_UPLOAD_SUCCESS",
      imageURLs: filename,
      infoId: infoId,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment,
  createInfo,
  createInfoImages,
  getinfoComments,
  deleteInfo,
  deleteComment,
};
