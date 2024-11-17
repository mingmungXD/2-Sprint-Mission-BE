const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addProduct = async (req, res) => {
  const { name, description, price, tags } = req.body;
  const images = req.files?.map(file => `/uploads/${file.filename}`);
  
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        images,
        userId: req.user.id,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "상품 등록 실패" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        comments: true,
        likes: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "상품 조회 실패" });
  }
};