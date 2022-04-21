const areaDao = require("../models/areaDao");

const getArea = async () => {
  return await areaDao.getArea();
};
const getCities = async () => {
  return await areaDao.getCities();
};
const getDistricts = async (id) => {
  return await areaDao.getDistricts(id);
};

module.exports = { getArea, getCities, getDistricts };
