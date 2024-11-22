import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController';
import authenticate from '../middlewares/auth';
import { validate } from '../middlewares/validationMiddleware';
import { createEventSchema } from '../schemas/eventValidationSchemas';

const router = express.Router();

router.post(
    '/',
    authenticate,
    validate(createEventSchema, 'body'), // Validación del cuerpo
    createEvent
  );
router.get('/', authenticate, getEvents);

export default router;
