const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      categoryName: true,
    },
  });
};

module.exports = {
  getCategories,
};
