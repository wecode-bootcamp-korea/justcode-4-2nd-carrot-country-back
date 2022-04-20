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
    viewCount,
    userId) 
    VALUES 
    (${title}, ${categoryId}, ${cityId}, ${districtId}, ${price}, ${description},${viewCount}, ${userId})`
  };

  const getProductIdBycreateAt = async(userId) => {
    return await prisma.$queryRaw`
    SELECT id FROM products WHERE userId = ${userId} ORDER BY createdAt DESC LIMIT 1`
  }
  
  const uploadProductImages = async (productId, imageURLsAddr) =>{
  const images = await prisma.$queryRaw`
  INSERT INTO products_images (productId, imageUrl)
  VALUES
  (${productId}, ${imageURLsAddr});
  `
  }


  

  module.exports = {
    createProduct,
    getProductIdBycreateAt,
    uploadProductImages
  };