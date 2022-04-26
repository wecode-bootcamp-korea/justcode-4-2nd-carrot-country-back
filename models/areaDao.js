const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//도시 아이디대로 오름차순 반영 완료
const getArea = async () => {
  return await prisma.city.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      cityName: true,
      district: {
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
