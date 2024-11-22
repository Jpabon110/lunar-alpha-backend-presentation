import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerService = async (body: any) => {
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

export const loginService = async (body:any) => {
  const { email, password } = body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const jwtSecret = process.env.JWT_SECRET || 'shhh';
  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: process.env.JWT_EXPIRED_TIME || '12h' });
};

export const getUsersService = (query:any) => {
  return prisma.user.findMany({
    select:
      { id: true, name: true, email: true }
  });
};
