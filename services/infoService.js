const infoDao = require("../models/infoDao");

const getInfos = async () => {
  return await infoDao.getInfos();
};
const getInfo = async (infoId) => {
  return await infoDao.getInfo(infoId);
};
const getSearchInfos = async (keyword) => {
  return await infoDao.getSearchInfos(keyword);
};
const getInfoComments = async (infoId) => {
  return await infoDao.getInfoComments(infoId);
};
module.exports = { getInfos, getInfo, getSearchInfos, getInfoComments };
