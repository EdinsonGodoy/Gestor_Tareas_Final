const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCurrentUser = async (req, res) => {
  try {
    const userId = Number(req.user.userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: `Error al obtener usuario: ${error.message}` });
  }
};

module.exports = { getCurrentUser };
