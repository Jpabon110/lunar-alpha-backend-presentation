import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface EventQuery {
  page?: number;
  limit?: number;
}

export const createEventService = (body: any) => {
  const { description, assignee, levelResource, critical } = body;
  return prisma.event.create({
    data: {
      description,
      levelResource,
      critical,
      assignedTo: {
        connect: { type: assignee }
      }
    }
  });
}

export const getEventsService = async (query: EventQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      skip,
      take: limit,
      select: {
        description: true,
        typeResource: true,
        levelResource: true,
        critical:true,
        createdAt:true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.event.count()
  ]);

  return {
    events,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}