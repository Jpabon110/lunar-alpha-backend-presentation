import { NextFunction, Request, Response, RequestHandler } from 'express';
import Joi from 'joi';

export const validate = (
  schema: Joi.ObjectSchema,
  property: 'body' | 'params' | 'query' = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      res.status(400).json({
        error: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    } else {
      next(); // Continuar al siguiente middleware o controlador
    }
  };
};
