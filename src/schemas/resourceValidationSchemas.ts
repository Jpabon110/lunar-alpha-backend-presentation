import Joi from 'joi';

export const createResourceSchema = Joi.object({
  type: Joi.string().valid('Oxygen', 'Food', 'Energy').required(),
  level: Joi.number().integer().positive().min(1).max(100).required(),
  critical: Joi.boolean().required(),
});

export const editResourceSchema = Joi.object({
  level: Joi.number().integer().positive().min(1).max(100).optional(),
  critical: Joi.boolean().optional(),
});

export const resourceIdSchema = Joi.object({
  type: Joi.string().valid('Oxygen', 'Food', 'Energy').required(),
});