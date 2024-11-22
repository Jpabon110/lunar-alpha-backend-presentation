import express from 'express';
import { createResource, getResources, editResource } from '../controllers/resourceController';
import authenticate from '../middlewares/auth';
import { validate } from '../middlewares/validationMiddleware';
import {
    createResourceSchema,
    editResourceSchema,
    resourceIdSchema,
  } from '../schemas/resourceValidationSchemas'

const router = express.Router();

router.post(
    '/',
    authenticate,
    validate(createResourceSchema, 'body'),
    createResource
  );
  
  router.get('/', authenticate, getResources);
  
  router.put(
    '/:type',
    authenticate,
    validate(resourceIdSchema, 'params'),
    validate(editResourceSchema, 'body'),
    editResource
  );

export default router;
