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
    userId) 
    VALUES 
    (${title}, ${categoryId}, ${cityId}, ${districtId}, ${price}, ${description},${userId})`;
};

const getProductIdBycreateAt = async (userId) => {
  return await prisma.$queryRaw`
    SELECT id FROM products WHERE userId = ${userId} ORDER BY createdAt DESC LIMIT 1`;
};

const uploadProductImages = async (productId, imageURLsAddr) => {
  const images = await prisma.$queryRaw`
  INSERT INTO products_images (productId, imageUrl)
  VALUES
  (${productId}, ${imageURLsAddr});
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

//getProductDetail
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

module.exports = {
  createProduct,
  getProductIdBycreateAt,
  uploadProductImages,
  deleteProduct,
  getProductList,
  getBestProducts,
  getProductDetail,
};
