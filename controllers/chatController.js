const chatService = require("../services/chatService");

const errorGenerator = require("../utils/errorGenerator");

const getRooms = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const rooms = await chatService.getRooms(Number(userId));
    return res.status(200).json({ message: "SUCCESS", rooms });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getChats = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const data = await chatService.getChats(Number(roomId));
    return res
      .status(200)
      .json({
        message: "SUCCESS",
        chats: data.chats,
        product: data.product.product,
      });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getRooms,
  getChats,
};
