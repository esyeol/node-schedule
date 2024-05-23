import { reserveDefine } from '../modules/reserve.define';

import reservationRepository from '../repositories/reservation/reservation.repository';
import ReservationModel from './models/reserve.model';

/**
 * ResreqBody: any, ReservationDto: anyerve Service
*/
class ReserveService {
  /** reservation service */
  async reservation(reservationInfo: ReservationModel) {
    try {
      // 예약 등록
      const handleJobs:boolean = await reserveDefine(reservationInfo);

      // 예약에 성공 했을 때, 예약정보를 테이블에 삽입 
      if(handleJobs) {
        const saveReservation = await reservationRepository.save(reservationInfo);
        console.log('saveReservation ->', saveReservation);
        console.log('success');
        return true;
      }else {
        console.log('handleJobs Not Found');
        return false;
      }
    } catch (error) {
      console.error('Reservation Service Error ->', error);
      throw new Error();
    }
  }

  /** reserveEvent consumer service */
  async reserveEvent() {
    try {
      
    } catch (error) {
      console.error(error);
      throw new Error();
    }  
  }
}

const reserveService = new ReserveService();
export { reserveService };