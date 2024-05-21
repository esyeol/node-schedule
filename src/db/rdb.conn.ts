import { Pool, createPool } from 'mysql2/promise';
/**
 * connection raw connection with rdb 
*/
export const createConnectionRDB = ():Pool => {
  const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: 30
  });

  return connection;
}