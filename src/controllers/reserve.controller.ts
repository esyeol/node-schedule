import { Request, Response, NextFunction } from 'express';
import statusCode from '../common/constant/status.code';
import { reserveService } from '../services/reserve.service';
import { ReservationDto } from '../services/dtos/reserve.dto';



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

      const reqBody: ReservationDto = {
        reserveTime: req.body.reserveTime,
        affiliation: req.body.affiliation,
        type: req.body.type,
        option: req.body.option
      };

      const rows = await reserveService.reservation(reqBody);

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
      console.log('reqeust ->', req);
    } catch (error) {
      console.error(`reservationEvent Controller Error -> ${error}`);
    }
  } 
}

const reserveController = new ReserveController();
export { reserveController };