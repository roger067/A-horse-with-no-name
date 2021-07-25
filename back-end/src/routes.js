import { Router } from 'express';
import {
  UserController,
  AuthController,
  FreelanceController,
  CardController,
  ChargeController,
  SprintController,
  DeveloperController,
} from './controllers';

import auth from './middlewares/auth';
import admin from './middlewares/admin';
import developer from './middlewares/developer';

const routes = new Router();

routes.post('/signup', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);
routes.get('/users', UserController.showAll);

routes.post('/login', AuthController.store);

routes.get('/freelance', auth(), admin(), FreelanceController.show);
routes.get('/freelance/:id', auth(), admin(), FreelanceController.showId);
routes.post('/freelance', auth(), admin(), FreelanceController.store);
routes.put('/freelance/:id', auth(), admin(), FreelanceController.update);
routes.delete('/freelance/:id', auth(), admin(), FreelanceController.delete);
routes.get('/graph', FreelanceController.getFreelancesGraph);

/* eslint-disable */
routes.get('/card/:id', auth(), developer(), CardController.show);
routes.get('/card-freelance/:id', auth(), developer(), CardController.showByFreelance);
routes.get('/card-sprint/:id', auth(), developer(), CardController.showBySprint);
routes.post('/card', auth(), developer(), CardController.store);
routes.put('/card/:id', auth(), developer(), CardController.update);
routes.delete('/card/:id', auth(), developer(), CardController.delete);
/* eslint-enable */

routes.get('/charge/:id', auth(), developer(), ChargeController.show);
routes.post('/charge', auth(), developer(), ChargeController.store);
routes.put('/charge/:id', auth(), developer(), ChargeController.update);
routes.delete('/charge/:id', auth(), developer(), ChargeController.delete);

routes.get('/sprints', auth(), developer(), SprintController.show);
routes.get('/sprint/:id', auth(), developer(), SprintController.showId);
routes.post('/sprint', auth(), developer(), SprintController.store);
routes.put('/sprint/:id', auth(), developer(), SprintController.update);
routes.delete('/sprint/:id', auth(), developer(), SprintController.delete);
routes.get('/sprint-cards/:id', auth(), developer(), SprintController.getCards);

/* eslint-disable */
routes.post('/set-card', auth(), developer(), DeveloperController.attainToCard);
/* eslint-enable */

routes.get('/generaty-relatory/:id', FreelanceController.generateRelatory);

routes.get('/profit', auth(), FreelanceController.calculateProfit);

export default routes;
