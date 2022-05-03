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
  const user = await userDao.checkUser(userId);
  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;
    throw error;
  }
  const isCorrect = bcrypt.compareSync(password, user.password);
  if (!isCorrect) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;
    throw error;
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  return { token, user };
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

const getUserById = async (userId) => {
  const user = await userDao.getUserById(userId);
  if (!user) {
    const error = new Error("EXSITING_USER");
    error.statusCode = 400;
    throw error;
  }
  return user;
};

module.exports = { signup, login, duplicateCheck, getUserById };
