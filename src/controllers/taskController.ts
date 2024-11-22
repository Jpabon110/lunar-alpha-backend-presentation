import { Request, Response } from 'express';
import { createTaskService, deleteTaskService, editTaskService, getTasksByIdService, getTasksService } from '../services/taskService';

export const createTask = async (req: Request, res: Response) => {

  try {
    const task = await createTaskService(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasksService(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const getTasksById = async (req: Request, res: Response) => {
  try {
    const task = await getTasksByIdService(parseInt(req.params.id, 10));
    res.json(task);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      const error = err as { status: number, message: string };
      res.status(error.status || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    await editTaskService(parseInt(req.params.id, 10), req.body);
    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      const error = err as { status: number, message: string };
      res.status(error.status || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await deleteTaskService(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      const error = err as { status: number, message: string };
      res.status(error.status || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
};
