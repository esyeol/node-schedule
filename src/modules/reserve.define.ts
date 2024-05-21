import schedule from 'node-schedule';
import axios from 'axios';
import { ReservationDto } from '../services/dtos/reserve.dto';

/**
 * 예약을 정의하는 함수
*/
export const reserveDefine = async(reserveData: ReservationDto): Promise<boolean> => {
  /**
   * node scheduler 등록 
   * 등록된 이후에 동작을 정의
   * */ 
  const job = schedule.scheduleJob(`${reserveData.reserveTime}`, async () => {
    console.log('new reservation with schedule');    
    try {  
      const response = await axios.post('http://localhost:80/api/v1/reservation/event', {
        reserveTime: reserveData.reserveTime,
        affiliation: reserveData.affiliation,
        option: reserveData.option,
        type: reserveData.type,
      });
      console.log('response data ->', response.data);
      return true;
    } catch (error) {
      console.error('reservation error', error);
      return false;
    }
  });
  return Promise.resolve(job ? true : false);
}