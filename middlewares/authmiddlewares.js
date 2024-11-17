const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "인증이 필요합니다." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: "사용자를 찾을 수 없습니다." });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
};

module.exports = authMiddleware;