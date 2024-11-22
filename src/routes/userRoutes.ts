import express from 'express';
import { register, login, getUsers } from '../controllers/userController';
import authenticate from '../middlewares/auth';

import { validate } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../schemas/userValidationSchemas';

const router = express.Router();

router.post('/register', validate(registerSchema, 'body'), register);
router.post('/login', validate(loginSchema, 'body'), login);
router.get('/', authenticate, getUsers);

export default router;
