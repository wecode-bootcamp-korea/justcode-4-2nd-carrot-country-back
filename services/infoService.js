const infoDao = require("../models/infoDao");

const getInfos = async (cityId, districtId) => {
  return await infoDao.getInfos(cityId, districtId);
};
const getInfo = async (id) => {
  return await infoDao.getInfo(id);
};
const getSearchInfos = async (keyword) => {
  return await infoDao.getSearchInfos(keyword);
};
const postInfoLike = async (userId, infoId) => {
  return await infoDao.postInfoLike(userId, infoId);
};
const deleteInfoLike = async (userId, infoId) => {
  return await infoDao.deleteInfoLike(userId, infoId);
};

const createComment = async (userId, infoId, comment)=>{
  return await infoDao.createComment(infoId, userId, comment);
}

const createInfo = async( userId, cityId, districtId, title , content ) => {
  return await infoDao.createInfo(userId, cityId, districtId, title , content);
}

const updateViewCount = async (infoId, curViewCount) => {
  return await infoDao.updateViewCount(infoId, curViewCount);
};

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment,
  createInfo,
  updateViewCount
};
