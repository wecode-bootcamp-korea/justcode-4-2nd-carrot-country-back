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
    (${title}, ${categoryId}, ${cityId}, ${districtId}, ${price}, ${description},${viewCount}, ${userId})`;
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

// title, cityName, districtName, updatedAt, createdAt, price, sum(chatrooms), sum(Liked)
const getProductList = async (districtId) => {
  const product = await prisma.$queryRaw`
    SELECT 
    p.title, 
    p.price, 
    p.createdAt, 
    p.updatedAt,
    c.cityName, 
    d.districtName 
    FROM products as p 
    LEFT JOIN cities as c ON c.id = p.cityId
    LEFT JOIN districts as d ON d.id = p.districtId
    WHERE d.id = ${districtId}
    ORDER by = p.updatedAt
 `;
  return await product;
};


module.exports = {
  createProduct,
  getProductIdBycreateAt,
  uploadProductImages,
  deleteProduct,
  getProductList
};
