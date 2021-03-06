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
  const newChat = await prisma.chat.create({
    data: {
      roomId,
      userId,
      text,
    },
  });
  return await prisma.chat.findUnique({
    where: {
      id: newChat.id,
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
          createdAt: true,
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

const getProductByRoomId = async (roomId) => {
  return await prisma.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    select: {
      buyer: {
        select: {
          id: true,
          nickname: true,
        },
      },
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          productImage: {
            take: 1,
            select: {
              id: true,
              imageUrl: true,
            },
          },
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      },
    },
  });
};

const duplicationRoomCheck = async ({ userId, productId }) => {
  return await prisma.chatRoom.findMany({
    where: {
      AND: [{ buyerId: userId }, { productId: productId }],
    },
    select: {
      id: true,
    },
  });
};
module.exports = {
  createRoom,
  createChat,
  getRooms,
  getChats,
  getProductByRoomId,
  duplicationRoomCheck,
};
