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

const getInfo = async (id) => {
  return await prisma.districtInfo.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      viewCount: true,
      user: {
        select: {
          id: true,
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
      },
      districtInfoLiked: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  });
};

const getSearchInfos = async (keyword) => {
  return await prisma.districtInfo.findMany({
    where: {
      title: {
        search: keyword,
      },
      content: {
        search: keyword,
      },
    },
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
  getInfos,
  getInfo,
  getSearchInfos,
};
