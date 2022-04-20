const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const userId = req.userId
    const cityId = req.cityId
    const districtId = req.districtId 

    const { title, categoryId, price, description, viewCount } = req.body;
    const createProduct = await productService.createProduct(
      title,
      categoryId,
      cityId,
      districtId,
      price,
      description,
      viewCount,
      userId,
    );


    return res.status(201).json({ message: "SUCCESS : CREATE PRODUCT" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { createProduct };
