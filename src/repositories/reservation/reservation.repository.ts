import { createConnectionRDB } from '../../db/rdb.conn';

import ReservationModel from '../../services/models/reserve.model';
import { Pool, ResultSetHeader } from 'mysql2/promise';

const connection: Pool = createConnectionRDB();

interface IRserveRepository {
  save(reservation: ReservationModel): Promise<ReservationModel>;
  findAll(searchParams: {affiliation: string, option: string}): Promise<ReservationModel[]>;
  findById(reservationId: number): Promise<ReservationModel | undefined>;
  update(reservation: ReservationModel): Promise<number>;
  delete(searchParams: {affiliation: string, option: string}): Promise<number>;
}

class ReservationRepository implements IRserveRepository {
  async save(reservation: ReservationModel): Promise<ReservationModel> {
    try {
      const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO tutorials (title, description, published) VALUES(?,?,?,?)',
        [reservation.affiliation, reservation.type, reservation.option ? reservation.reserveTime : false]
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
   * 
  */
  async findAll(searchParams: { affiliation: string; option: string; }): Promise<ReservationModel[]> {
    throw new Error('Method not implemented.');
  }

  
  async findById(reservationId: number): Promise<ReservationModel | undefined> {
    const [rows] = await connection.execute<ReservationModel[]>(
      'SELECT * FROM reservation WHERE idx = ?',[reservationId]
    );
    return rows[0];
  }

  async update(reservation: ReservationModel): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async delete(searchParams: { affiliation: string; option: string; }): Promise<number> {
    throw new Error('Method not implemented.');
  }
  
}
