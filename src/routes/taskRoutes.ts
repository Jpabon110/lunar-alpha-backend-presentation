import express from 'express';
import { createTask, getTasks, editTask, getTasksById, deleteTask } from '../controllers/taskController';
import authenticate from '../middlewares/auth';
import { validate } from '../middlewares/validationMiddleware';
import {
    createTaskSchema,
    editTaskSchema,
    deleteTaskSchema,
    getTaskByIdSchema,
  } from '../schemas/taskValidationSchemas';

const router = express.Router();

router.post('/', authenticate, validate(createTaskSchema, 'body'), createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, validate(getTaskByIdSchema, 'params'),  getTasksById);
router.put('/:id', authenticate, validate(getTaskByIdSchema, 'params'), validate(editTaskSchema, 'body'),  editTask);
router.delete('/:id', authenticate, validate(getTaskByIdSchema, 'params'), validate(deleteTaskSchema, 'params'),   deleteTask);

export default router;
