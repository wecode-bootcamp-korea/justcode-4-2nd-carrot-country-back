const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRoom = async (props) => {
  const { userId, productId } = props;
  return await prisma.chatRoom.create({
    data: {
      productId: productId,
      buyerId: userId,
    },
  });
};

const createChat = async (props) => {
  const { userId, roomId, text } = props;
  return await prisma.chat.create({
    data: {
      roomId,
      userId,
      text,
    },
  });
};

const getRooms = async (userId) => {
  return await prisma.chatRoom.findMany({
    where: {
      OR: [
        { buyerId: userId },
        {
          product: {
            userId: userId,
          },
        },
      ],
    },
    select: {
      id: true,
      buyer: {
        select: {
          id: true,
          nickname: true,
        },
      },
      product: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              nickname: true,
              district: {
                select: {
                  id: true,
                  districtName: true,
                },
              },
            },
          },
          productImage: {
            take: 1,
            select: {
              imageUrl: true,
            },
          },
        },
      },
      chat: {
        take: 1,
        orderBy: [{ createdAt: "desc" }],
        select: {
          id: true,
          text: true,
        },
      },
      createdAt: true,
      lastVisitAt: true,
    },
  });
};

const getChats = async (roomId) => {
  return await prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};

module.exports = {
  createRoom,
  createChat,
  getRooms,
  getChats,
};
