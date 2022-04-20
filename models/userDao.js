const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkDuplicateEmail = async (userId) => {
    const data = await prisma.$queryRaw`
    SELECT userId FROM users WHERE userId = ${userId}
    `;
    return data;
  };
  
  const createUser = async (
    userId, nickname, encryptedPassword, cityId, districtId
  ) => {
    return await prisma.$queryRaw`
      INSERT INTO users (userId, nickname, password, cityId, districtId) VALUES (${userId}, ${nickname}, ${encryptedPassword}, ${cityId}, ${districtId})
      `;
  };
  
  const checkUser = async (userId, password) => {
    return await prisma.$queryRaw`
      SELECT id, userId, password from users where userId = ${userId}
    `;
  };

  module.exports = { checkDuplicateEmail, createUser, checkUser};