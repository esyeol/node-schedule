import { ReservationDto } from './dtos/reserve.dto';
import { reserveDefine } from '../modules/reserve.define';

/**
 * ResreqBody: any, ReservationDto: anyerve Service
*/
class ReserveService {
  /** reservation service */
  async reservation(reqBody: ReservationDto) {
    try {
      // 예약 등록
      const handleJobs:boolean = await reserveDefine(reqBody);

      // 예약에 성공 했을 때, 예약정보를 테이블에 삽입 
      if(handleJobs) {
        // 
      }else {
        return false;
      }

    } catch (error) {
      console.error(error);
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