import { prisma } from '../prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const registerUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Неверный эл. почта или пароль');

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new Error('Неверный эл. почта или пароль');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};