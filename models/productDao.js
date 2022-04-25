const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//매물 등록 API (1) - text info
const createProduct = async (
  title,
  categoryId,
  cityId,
  districtId,
  price,
  description,
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
    userId) 
    VALUES 
    (${title}, ${categoryId}, ${cityId}, ${districtId}, ${price}, ${description},${userId})`;
};

//매물 등록하고 생성된 product Id 확인
const getProductIdBycreateAt = async (userId) => {
  return await prisma.$queryRaw`
    SELECT id FROM products WHERE userId = ${userId} ORDER BY createdAt DESC LIMIT 1`;
};

//이미지 등록
const createProductImages = async (filename, productId) => {
  const productIdArr = [];
  productIdArr.push(productId);
  return productIdArr.forEach(async (productIdArr) =>
  filename.forEach(
      async (filename) =>
        await prisma.$queryRaw`
  INSERT INTO products_images (productId, imageUrl)
  VALUES
  (${productIdArr}, ${filename});
  `
    )
  );
};

const updateProductImages = async (filename, productId) => {
  await prisma.$queryRaw`
  DELETE FROM products_images WHERE productId = ${productId}
  `;
  const productIdArr = [];
  await productIdArr.push(productId);
  await productIdArr.forEach(async (productIdArr) =>
  filename.forEach(
      async (filename) =>
        await prisma.$queryRaw`
  INSERT INTO products_images (productId, imageUrl)
  VALUES
  (${productIdArr}, ${filename})
  `
    )
  );
};

//제품정보 수정
const updateProduct = async (
  userId,
  productId,
  title,
  categoryId,
  price,
  description
) => {
  await prisma.$queryRaw`
  UPDATE products SET title =${title}, categoryId=${categoryId}, price=${price}, description=${description}
  WHERE id = ${productId} AND userId=${userId}
  `;
};

const deleteProduct = async (userId, productId) => {
  await prisma.$queryRaw`
DELETE FROM products_images WHERE productId = ${productId};
`;
  await prisma.$queryRaw`
DELETE FROM products
WHERE userId = ${userId} AND id = ${productId};
`;
};

//매물 리스트 페이지 정보 불러오기 API (유저의 지역에 해당되는 매물)
const getProductList = async (districtId, cityId) => {
  return await prisma.product.findMany({
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
      price: true,
      createdAt: true,
      updatedAt: true,
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
      chatRoom: {
        select: {
          id: true,
        },
      },
      productIntrested: {
        select: {
          id: true,
        },
      },
      productImage: {
        take: 1,
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
};

const getBestProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      viewCount: "desc",
    },
    select: {
      id: true,
      title: true,
      price: true,
      viewCount: true,
      updatedAt: true,
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
      chatRoom: {
        select: {
          id: true,
        },
      },
      productIntrested: {
        select: {
          id: true,
        },
      },
      productImage: {
        take: 1,
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
};

//매물 디테일 페이지 정보 불러오기 API
const getProductDetail = async (productId) => {
  return await prisma.product.findMany({
    where: {
      id: Number(productId),
    },
    select: {
      id: true,
      title: true,
      price: true,
      description: true,
      viewCount: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
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
      chatRoom: {
        select: {
          id: true,
        },
      },
      productIntrested: {
        select: {
          id: true,
        },
      },
      productImage: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
};

const duplicateInterested = async (userId, productId) => {
  return await prisma.$queryRaw`
  SELECT id from products_interested where userId = ${userId} AND productId =${productId}
`;
};

const productInterested = async (userId, productId) => {
  const interested = await prisma.productInterested.create({
    data: {
      userId: userId,
      productId: productId,
    },
  });
  return interested;
};

const productUnInterested = async (userId, productId) => {
  await prisma.productInterested.deleteMany({
    where: {
      userId: userId,
      productId: productId,
    },
  });
};

module.exports = {
  createProduct,
  getProductIdBycreateAt,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
  createProductImages,
  productInterested,
  productUnInterested,
  duplicateInterested,
  updateProduct,
  updateProductImages,
};
