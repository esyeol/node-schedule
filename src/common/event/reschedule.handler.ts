import { reserveDefine } from '../../modules/reserve.define';
import reservationRepository from '../../repositories/reservation/reservation.repository';

/**
 * 서버 재시작 & 최초 시작시 reservation 테이블에 들어있는 예약 리스트를 등록시켜주는 모듈 
 * 
*/
export const rescheduleHandler = async() => {
  /**
   *  전체 예약 리스트에서 대기중인 예약 리스트 조회
   * */  
  const findAllReservation = await reservationRepository.findAll({});
  console.log('findAllReservation -> ', findAllReservation);

  findAllReservation.forEach(async(reservation) => {
    await reserveDefine(reservation);
  });
}