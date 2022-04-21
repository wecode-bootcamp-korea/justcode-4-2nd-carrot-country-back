const validSignup = async (req, res, next) => {
  const { userId, nickname, password, cityId, districtId } = req.body;
  console.log(nickname);
  if (!userId || !nickname || !password || !cityId || !districtId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  next();
};

const validLogin = async (req, res, next) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  next();
};

const validCreateProduct = async (req, res, next) => {
    const { title, categoryId, price, description } = req.body;
    console.log("왜 키에러야", req.body.title)
    if (!title || !categoryId || !price || !description) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    next();
  };

//   const validUpdateCart = async (req, res, next) => {
//     const { id, quantity, totalPrice } = req.body;

//     if (!id || !quantity || !totalPrice) {
//       return res.status(400).json({ message: "KEY_ERROR" });
//     }

//     next();
//   };

  const validDeleteProduct = async (req, res, next) => {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    next();
  };

//   const validAddOptionCart = async (req, res, next) => {
//     const { id, totalPrice } = req.body;

//     if (!id || !totalPrice) {
//       return res.status(400).json({ message: "KEY_ERROR" });
//     }

//     next();
//   };

module.exports = {
  validLogin,
  validSignup,
  validCreateProduct,
  validDeleteProduct 
};
