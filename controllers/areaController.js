const areaService = require("../services/areaService");

const errorGenerator = require("../utils/errorGenerator");

const getArea = async (req, res, next) => {
  try {
    const area = await areaService.getArea();
    return res.status(200).json({ message: "SUCCESS", area });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
const getCities = async (req, res, next) => {
  try {
    const cities = await areaService.getCities();
    return res.status(200).json({ message: "SUCCESS", cities });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
const getDistricts = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    if (!cityId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const districts = await areaService.getDistricts(Number(cityId));
    return res.status(200).json({ message: "SUCCESS", districts });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getArea, getCities, getDistricts };
