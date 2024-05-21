import { Router } from 'express'
import { reserveController } from '../controllers/reserve.controller';

import reservationValid from '../valid/reservation.valid';

const reserveRouter:Router = Router();

reserveRouter.post('/', reservationValid.reserveValidator, reserveController.reservation);
reserveRouter.post('/event', reserveController.reserveEvent);

export { reserveRouter };

