const productService = require("../services/productService");

const createProduct = async (req, res) => {
    try {
      const { userId, , cityID, districtId }  = req
      const { addOptionId, quantity, totalPrice } = req.body;
  
      const createProduct = await productService.createProduct(
        
        addOptionId,
        quantity,
        totalPrice
      );
  
      return res.status(201).json({ message: "SUCCESS : ADD TO CART" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };






module.exports = { signup, login };