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
    if (!cityId || cityId === "undefined" || cityId === undefined) {
      const err = new Error("KEY ERROR : CITY-ID");
      err.statusCode = 400;
      throw err;
    }
    const districts = await areaService.getDistricts(Number(cityId));
    if (districts.length === 0) {
      const err = new Error("INVALID REQUEST");
      err.statusCode = 400;
      throw err;
    }
    return res.status(200).json({ message: "SUCCESS", districts });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getArea, getCities, getDistricts };
