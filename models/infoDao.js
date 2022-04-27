const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getInfos = async (cityId, districtId) => {
  return await prisma.districtInfo.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      district: {
        id: districtId,
      },
      city: {
        id: cityId,
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

const getInfo = async (infoId) => {
  return await prisma.districtInfo.findUnique({
    where: {
      id: infoId,
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

const postInfoLike = async (userId, infoId) => {
  return await prisma.$queryRaw`
  INSERT INTO districts_infos_liked(userId, infoId) VALUES (${userId}, ${infoId});
  `;
};

const deleteInfoLike = async (userId, infoId) => {
  return await prisma.$queryRaw`
  DELETE FROM districts_infos_liked WHERE userId = ${userId} AND infoID = ${infoId};
  `;
};

const createComment = async (infoId, userId, comment) => {
  const writerDistrict = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      id: true,
      districtId: true,
    },
  });
  const infoDistrict = await prisma.districtInfo.findMany({
    where: {
      id: infoId,
    },
    select: {
      id: true,
      districtId: true,
    },
  });
  if (writerDistrict[0].districtId !== infoDistrict[0].districtId) {
    const err = new Error("NOT YOUR DISTRICT");
    err.statusCode = 400;
    throw err;
  }
  return await prisma.$queryRaw`
  INSERT INTO comments (infoId, userId, comment) VALUES (${infoId}, ${userId}, ${comment});
  `;
};

const updateViewCount = async (infoId, curViewCount) => {
  await prisma.districtInfo.update({
    where: {
      id: infoId,
    },
    data: {
      viewCount: curViewCount + 1,
    },
  });
};

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment,
  updateViewCount,
};
