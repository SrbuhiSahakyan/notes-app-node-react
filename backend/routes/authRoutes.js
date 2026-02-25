import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { prisma } from '../prismaClient.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true },
  });
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

export default router;