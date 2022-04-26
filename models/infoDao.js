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

//해당 infoId에 엮여있는 comment 추가하기
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
      comment: {
        select: {
          id: true,
          userId: true,
          comment: true,
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

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment,
};
