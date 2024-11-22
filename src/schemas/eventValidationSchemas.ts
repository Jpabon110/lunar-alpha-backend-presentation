import Joi from 'joi';

export const createEventSchema = Joi.object({
  description: Joi.string().min(5).max(80).required(),
  levelResource: Joi.number().positive().min(1).max(100).required(),
  critical: Joi.boolean().default(false),
  assignee: Joi.string().valid('Oxygen', 'Food', 'Energy').required(),
});
