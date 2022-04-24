const chatService = require("../services/chatService");
const errorGenerator = require("../utils/errorGenerator");

const handleSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("create_room", async (userId, productId, callback) => {
      try {
        if (!userId || !productId || !callback) {
          throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
        }
        const room = await chatService.createRoom({ userId, productId });
        socket.join(room.id);
        callback(room.id);
      } catch (err) {
        console.log("create_room error : ", err);
      }
    });

    socket.on("enter_room", async (roomId, callback) => {
      try {
        if (!roomId || !callback) {
          throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
        }
        socket.join(roomId);
        callback(roomId);
      } catch (err) {
        console.log("enter_room error : ", err);
      }
    });

    socket.on("new_text", async (userId, roomId, text, callback) => {
      try {
        if (!userId || !roomId || !text || !callback) {
          throw await errorGenerator({
            statusCode: 400,
            message: "KEY_ERROR",
          });
        }
        const chat = await chatService.createChat({ userId, roomId, text });
        socket.to(roomId).emit("new_text", chat);
        callback(chat);
      } catch (err) {
        console.log("new_text error : ", err);
      }
    });
  });
};

module.exports = { handleSocket };
