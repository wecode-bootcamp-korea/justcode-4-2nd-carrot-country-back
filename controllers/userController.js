const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    const { userId, nickname, password, cityId, districtId } = req.body;
    await userService.signup(userId, nickname, password, cityId, districtId);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const params = await userService.login(userId, password);
    return res.status(201).json({
      message: "SUCCESS_LOGIN",
      token: params.token,
      user: params.user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
const duplicateCheck = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      const error = new Error("KEY_ERROR");
      error.status = 400;
      throw error;
    }

    const checkResult = await userService.duplicateCheck(userId);
    return res.status(201).json({
      message: "NEW_USER",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.userId;
    if (!id) {
      const error = new Error("KEY_ERROR");
      error.status = 400;
      throw error;
    }

    const user = await userService.getUserById(id);
    return res.status(201).json({
      message: "SECCESS",
      user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signup, login, duplicateCheck, getUserById };
