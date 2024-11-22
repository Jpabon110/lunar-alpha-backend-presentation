import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(10).required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  userId: Joi.number().integer().positive().required(),
});

export const editTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  assignedToId: Joi.number().integer().positive().optional(),
});

export const deleteTaskSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const getTaskByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
