import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createResourceService = (body:any) => {
  const { type, level, critical } = body;
  return prisma.resource.create({
    data: { type, level, critical }
  });
};

export const getResourcesService = (query:any) => {
  return prisma.resource.findMany({
    select: {
      id: true, type: true, level: true, critical: true
    }
  });
};

export const editResourceService = async (type:string, body:any) => {
  const { level, critical } = body;
  const existingResource = await prisma.resource.findUnique({
    where: { type },
  });
  if (!existingResource) {
    throw { status: 404, message: 'Resource not found' };
  }
  return prisma.resource.update({
    where: { type },
    data: {
      level,
      critical,
    },
  });
};
