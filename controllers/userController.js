const userService = require("../services/userService");

const signup = async (req, res) => {
    try {
      const { userId, nickname, password, cityId, districtId } = req.body;
      await userService.signup(userId, nickname, password, cityId, districtId);
      return res.status(201).json({ message: "SIGNUP_SUCCESS" });
    } catch (err) {
      return res.status(err.statusCode || 500).json({ message: err.message });
  }}

  const login = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const token = await userService.login(userId, password);
      return res.status(201).json({
        message: "SUCCESS_LOGIN",
        token : token,
      })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  module.exports = { signup, login };