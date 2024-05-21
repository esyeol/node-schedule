import { RowDataPacket } from 'mysql2';

export default interface ReservationModel extends RowDataPacket {
  affiliation: string,
  option:  string,
  type: string,
  reserveTime: Date,
}