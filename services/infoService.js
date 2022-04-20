const infoDao = require("../models/infoDao");

const getInfo = async (id) => {
  return await infoDao.getInfo(id);
};

module.exports = { getInfo };
