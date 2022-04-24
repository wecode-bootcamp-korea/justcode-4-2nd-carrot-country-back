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
  if (!title || !categoryId || !price || !description) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  next();
};

//   const validUpdateProduct = async (req, res, next) => {
//     const {  } = req.body;

//     if ( ||  || ) {
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

const validProductInterested = async (req, res, next) => {
  const productId = req.url.split("/")[1];
  if (!productId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  next();
};

module.exports = {
  validLogin,
  validSignup,
  validCreateProduct,
  validDeleteProduct,
  validProductInterested,
};
