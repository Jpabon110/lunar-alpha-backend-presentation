import { Request, Response } from 'express';
import { createEventService, getEventsService } from '../services/eventService';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await createEventService(req.body);
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await getEventsService(req.query);
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
};
