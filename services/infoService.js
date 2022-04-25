const infoDao = require("../models/infoDao");

const getInfos = async () => {
  return await infoDao.getInfos();
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
module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
};
