const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getArea = async () => {
  return await prisma.city.findMany({
    select: {
      id: true,
      cityName: true,
      District: {
        select: {
          id: true,
          districtName: true,
        },
      },
    },
  });
};

const getCities = async () => {
  return await prisma.city.findMany({
    select: {
      id: true,
      cityName: true,
    },
  });
};

const getDistricts = async (id) => {
  return await prisma.district.findMany({
    where: {
      cityId: id,
    },
    select: {
      id: true,
      districtName: true,
    },
  });
};

module.exports = {
  getArea,
  getCities,
  getDistricts,
};
