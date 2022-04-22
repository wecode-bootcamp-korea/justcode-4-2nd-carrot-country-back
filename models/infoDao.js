const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getInfos = async () => {
  return await prisma.districtInfo.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      viewCount: true,
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
      districtInfoImage: {
        take: 1,
        select: {
          id: true,
          imageUrl: true,
        },
      },
      districtInfoLiked: {
        select: {
          id: true,
        },
      },
    },
  });
};

module.exports = {
  getInfos
};
