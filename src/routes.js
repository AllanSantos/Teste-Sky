import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signUp', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/user/:id', authMiddleware, UserController.index);

routes.use(authMiddleware)

routes.patch('/signIn', UserController.update);

export default routes