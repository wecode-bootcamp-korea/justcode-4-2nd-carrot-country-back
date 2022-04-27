const chatDao = require("../models/chatDao");

const createRoom = async (props) => {
  return await chatDao.createRoom(props);
};

const createChat = async (props) => {
  return await chatDao.createChat(props);
};

const getRooms = async (userId) => {
  return await chatDao.getRooms(userId);
};

const getChats = async (roomId) => {
  const product = await chatDao.getProductByRoomId(roomId);
  const chats = await chatDao.getChats(roomId);
  return { product, chats };
};
module.exports = { createRoom, createChat, getRooms, getChats };
