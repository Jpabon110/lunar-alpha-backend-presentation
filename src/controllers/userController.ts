import { Request, Response } from 'express';
import { getUsersService, loginService, registerService } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  
  try {
    const user = await registerService(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginService(req.body);
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      const error = err as { status: number, message: string };
      res.status(error.status || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService(req.query);
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};
