import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTaskService = (body:any) => {
  const { title, description, priority, userId } = body;
  return prisma.task.create({
    data: { title, description, priority, assignedTo: { connect: { id: userId} } },
  });
};


export const getTasksService = (query: any) => {
  return prisma.task.findMany({
    include: {
      assignedTo: {
        select: {
          id: true, name: true, email: true
        }
      }
    }
  });
};

export const getTasksByIdService = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      assignedTo: {
        select: {
          id: true, name: true, email: true
        }
      }
    }
  });

  if (!task) {
    throw { status: 404, message: 'Task not found' };
  }

  return task;
};

export const editTaskService = async (id: number, body: any) => {
  const { title, description, priority, assignedToId } = body;
  await getTasksByIdService(id);
  return prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      priority,
      assignedTo: assignedToId
        ? { connect: { id: assignedToId } }
        : undefined,
    },
  });
};

export const deleteTaskService = async (id: number) => {
  await getTasksByIdService(id);
  return prisma.task.delete({
    where: { id }
  });
};
