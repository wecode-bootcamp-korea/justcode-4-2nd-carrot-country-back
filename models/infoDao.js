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

// 댓글 가져오기
const getinfoComments = async (infoId) => {
  console.log("infoDao 프리즈마 전 infoId", infoId);
  return await prisma.comment.findMany({
    where: {
      infoId: infoId,
    },
    select: {
      id: true,
      comment: true,
      createdAt: true,
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
      commentLiked :{
        select : {
          id : true,
        }
      }  
    },
    })
  }

  const deleteInfo = async ( infoId ) =>{
    await prisma.$queryRaw`
    DELETE FROM districts_infos_images WHERE infoId = ${infoId};
    `;
    await prisma.$queryRaw`
    DELETE FROM districts_infos WHERE id = ${infoId}
    `
  }

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

const createInfo = async (userId, cityId, districtId, title, content) => {
  return await prisma.$queryRaw`
  INSERT INTO districts_infos 
  (userId, cityId, districtId, title ,content) 
  VALUES 
  (${userId}, ${cityId}, ${districtId}, ${title}, ${content})`;
};

//동네정보 등록하고 생성된  infoId 확인
const getinfoIdBycreateAt = async (userId) => {
  return await prisma.$queryRaw`
    SELECT id FROM districts_infos WHERE userId = ${userId} ORDER BY createdAt DESC LIMIT 1`;
};

//동네정보 이미지 등록
const createInfoImages = async (filename, infoId) => {
  const infoIdArr = [];
  infoIdArr.push(infoId);
  return infoIdArr.forEach(async (infoIdArr) =>
    filename.forEach(
      async (filename) =>
        await prisma.$queryRaw`
  INSERT INTO districts_infos_images (infoId, imageUrl)
  VALUES
  (${infoIdArr}, ${filename});
  `
    )
  );
};

module.exports = {
  getInfos,
  getInfo,
  getSearchInfos,
  postInfoLike,
  deleteInfoLike,
  createComment,
  updateViewCount,
  createInfo,
  getinfoIdBycreateAt,
  createInfoImages,
  getinfoComments,
  deleteInfo
};
