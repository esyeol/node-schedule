import { ReservationDto } from './../services/dtos/reserve.dto';
import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import statusCode from '../common/constant/status.code';
import { reserveService } from '../services/reserve.service';
import ReservationModel from '../services/models/reserve.model';



/**
 * Reservation Controller
*/
class ReserveController {
  /**
   * 예약등록 
   * */ 
  async reservation(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Reservation');

      const reservationInfo:ReservationModel = req.body;
      console.log('resreservationInfo -->',reservationInfo);

      const rows = await reserveService.reservation(reservationInfo);

      return res.status(statusCode.OK).json({ success: true, message: 'success'});   
    } catch (error) {
      console.error(`reservation Controller Error -> ${error}`);
    }
  }
  /**
   * reservationEvent Controller 
   * */ 
  async reserveEvent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Call Back Reservation Event');
      const rows = await reserveService.reserveEvent();
      if(rows) {
        return res.status(statusCode.OK).json({ success: true, message: 'success', data:rows});   
      }

      // console.log('reqeust ->', req);
    } catch (error) {
      console.error(`reservationEvent Controller Error -> ${error}`);
    }
  } 
}

const reserveController = new ReserveController();
export { reserveController };