import { Request, Response } from 'express';
import { createResourceService, editResourceService, getResourcesService } from '../services/resourceService';

export const createResource = async (req: Request, res: Response) => {
  try {
    const resoruce = await createResourceService(req.body);
    res.json(resoruce);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const resource = await getResourcesService(req.query);
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const editResource = async (req: Request, res: Response) => {
  try {
    const updatedResource = await editResourceService(req.params.type, req.body);
    res.json(updatedResource);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      const error = err as { status: number, message: string };
      res.status(error.status || 500).json({ error: error.message || 'An unexpected error occurred' });
    }
  }
};
