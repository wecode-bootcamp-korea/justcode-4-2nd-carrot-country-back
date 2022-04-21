const infoService = require("../services/infoService");

const errorGenerator = require("../utils/errorGenerator");

const getInfo = async (req, res, next) => {
  try {
    const { infoId } = req.params;
    if (!infoId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const districtInfo = await infoService.getInfo(Number(infoId));
    return res.status(200).json({ message: "SUCCESS", districtInfo });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getInfo };
