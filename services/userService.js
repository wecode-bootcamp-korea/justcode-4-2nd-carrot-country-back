const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (userId, nickname, password, cityId, districtId) => {
  const user = await userDao.checkDuplicateEmail(userId);
  if (user.length !== 0) {
    const error = new Error("EXSITING_USER");
    error.statusCode = 400;
    throw error;
  }
  const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const createUser = await userDao.createUser(
    userId,
    nickname,
    encryptedPassword,
    cityId,
    districtId
  );
  return createUser;
};

const login = async (userId, password) => {
  const user = await userDao.checkUser(userId, password);
  if (user.length === 0) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;
    throw error;
  }
  const isCorrect = bcrypt.compareSync(password, user[0].password);
  if (!isCorrect) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;
    throw error;
  }
  const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY);
  return token;
};

const duplicateCheck = async (userId) => {
  const userCheck = await userDao.checkDuplicateEmail(userId);
  if (userCheck.length !== 0) {
    const error = new Error("EXSITING_USER");
    error.statusCode = 400;
    throw error;
  }
  return userCheck;
};


module.exports = { signup, login, duplicateCheck };
