import { RowDataPacket } from 'mysql2';

export default interface ReservationModel extends RowDataPacket {
  affiliation: string,
  option:  string,
  reserveTime: Date,
}