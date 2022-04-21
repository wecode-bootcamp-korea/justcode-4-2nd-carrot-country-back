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
module.exports = { getInfos, getInfo, getSearchInfos };
