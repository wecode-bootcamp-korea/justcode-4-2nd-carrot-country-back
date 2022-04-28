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

const getinfoComments = async (infoId) =>{
  return await infoDao.getinfoComments(infoId)
}

const postInfoLike = async (userId, infoId) => {
  return await infoDao.postInfoLike(userId, infoId);
};
const deleteInfoLike = async (userId, infoId) => {
  return await infoDao.deleteInfoLike(userId, infoId);
};

const createComment = async (userId, infoId, comment)=>{
  return await infoDao.createComment(infoId, userId, comment);
};

const createInfo = async( userId, cityId, districtId, title , content ) => {
  return await infoDao.createInfo(userId, cityId, districtId, title , content);
};

const getinfoIdBycreateAt = async (userId) => {
  const getinfoIdBycreateAt = await infoDao.getinfoIdBycreateAt(
    userId
  );
  return getinfoIdBycreateAt[0].id;
};

const createInfoImages = async (filename, infoId) => {
  return await infoDao.createInfoImages(filename, infoId);
};

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
  updateViewCount,
  createInfoImages,
  getinfoIdBycreateAt,
  getinfoComments
};
