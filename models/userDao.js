const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkDuplicateEmail = async (userId) => {
  const data = await prisma.$queryRaw`
    SELECT userId FROM users WHERE userId = ${userId}
    `;
  return data;
};

const createUser = async (
  userId,
  nickname,
  encryptedPassword,
  cityId,
  districtId
) => {
  return await prisma.$queryRaw`
      INSERT INTO users (userId, nickname, password, cityId, districtId) VALUES (${userId}, ${nickname}, ${encryptedPassword}, ${cityId}, ${districtId})
      `;
};

const checkUser = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      password: true,
      nickname: true,
      city: {
        select: {
          id: true,
          cityName: true,
        },
      },
      district: {
        select: {
          id: true,
          districtName: true,
        },
      },
    },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      userId: true,
      nickname: true,
      city: {
        select: {
          id: true,
          cityName: true,
        },
      },
      district: {
        select: {
          id: true,
          districtName: true,
        },
      },
    },
  });
};

const getUserDistrictInfo = async (userId) => {
  return await prisma.$queryRaw`
    SELECT cityId, districtId from users where id = ${userId}`;
};

module.exports = {
  checkDuplicateEmail,
  createUser,
  checkUser,
  getUserById,
  getUserDistrictInfo,
};
