import connection  from '../../db/rdb.conn';
import moment from 'moment-timezone';

import ReservationModel from '../../services/models/reserve.model';
import { ResultSetHeader } from 'mysql2/promise';

interface IRserveRepository {
  save(reservation: ReservationModel): Promise<ReservationModel>;
  findAll(searchParams: {affiliation: string, option: string}): Promise<ReservationModel[]>;
  findById(reservationId: number): Promise<ReservationModel | undefined>;
  update(reservation: ReservationModel): Promise<number>;
  delete(searchParams: {affiliation: string, option: string}): Promise<number>;
}

class ReservationRepository implements IRserveRepository {
  /**
   * 예약 저장 
   * @param reservation: ReservationModel 
  */
  async save(reservation: ReservationModel): Promise<ReservationModel> {
    let conn;
    try {
      conn = await connection.getConnection();
      const [result] = await conn.execute<ResultSetHeader>(
        'INSERT INTO reservation (affiliation, option, reservation_time) VALUES(?,?,?)',
        [reservation.affiliation, reservation.option, reservation.reserveTime]
      );

      // 삽입된 데이터의 완전성을 보장하기 위해서 재조회
      const insertId = result.insertId;
      const savedReservation = await this.findById(insertId);
      return savedReservation!;

    } catch (error) {
      console.error('Reservation Save Error ->', error);
      throw new Error;
    }
  }

  /**
   * 전체 예약된 항목 조회 
   * 학교, 예약 발송 유형
  */
  async findAll(searchParams: { affiliation?: string; option?: string; type?:number; }): Promise<ReservationModel[]> {
    
    let conn; 
    let query: string = `SELECT affiliation, option, reservation_time as reserveTime FROM reservation`;
    let condition: string[] = [];
    console.log('searchParams ->', searchParams);

    try {
      conn = await connection.getConnection();

      if(searchParams.affiliation) condition.push(`affiliation = '${searchParams.affiliation}'`);

      if(searchParams.option) condition.push(`option = '${searchParams.option}'`);

      if(searchParams.type) condition.push('type = 0');
      
      if(condition.length) query +=  ' WHERE ' + condition.join(' AND ');

      const [rows] = await conn.execute<ReservationModel[]>(query);
       // 예약 시간 KST로 변환
       // 예약 시간 KST로 변환하고 Date 객체로 반환
      const transformedRows = rows.map(row => {
        return {
          ...row,
          reserveTime: moment.tz(row.reserveTime, 'Asia/Seoul').toDate()
        };
      });

      return transformedRows;
      // return rows;
      
    } catch (error) {
      console.error('Error -> ',error);
      throw new Error();
    }
  }

  /**
   * 예약 단일 조회
  */
  async findById(reservationId: number): Promise<ReservationModel | undefined> {
    let conn;
    try {
      conn = await connection.getConnection();
      const [rows] = await conn.execute<ReservationModel[]>(
        'SELECT * FROM reservation WHERE idx = ?',[reservationId]
      );
      return rows[0];  
    } catch (error) {
      console.error('findById with Reservation Error ->', error);
    }
  }

  async update(reservation: ReservationModel): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async delete(searchParams: { affiliation: string; option: string; }): Promise<number> {
    throw new Error('Method not implemented.');
  }
  
}

export default new ReservationRepository();
