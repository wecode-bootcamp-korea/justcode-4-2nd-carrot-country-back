const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (
    title,
    categoryId,
    cityId,
    districtId,
    price,
    description,
    viewCount,
    userId
  ) => {
    return await prisma.$queryRaw`
    INSERT INTO products 
    (title,
    categoryId,
    cityId,
    districtId,
    price,
    description,
    viewCount,
    userId) 
    VALUES 
    (${title}, ${categoryId}, ${cityId}, ${districtId}, ${price}, ${description},${viewCount}, ${userId})`
  };

  module.exports = {
    createProduct
  };