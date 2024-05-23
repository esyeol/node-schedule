import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// ERROR & SUCCESS CODE
const TAG_SUCCESS = 'db success created pool';
const TAG_PROTOCOL_CONNECTION_LOST = 'db connection was closed.';
const TAG_ER_CON_COUNT_ERROR = 'db has too many connections.';
const TAG_ECONNREFUSED = 'db connection was refused.';

// create the connection to database
const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    database: process.env.DB_SCHEMA as string,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
});

// Connection interface
interface IConnection {
    getConnection: () => Promise<PoolConnection>;
}

const connection: IConnection = {
    getConnection: async () => {
        try {
            const conn = await pool.getConnection();
            console.log(TAG_SUCCESS);
            return conn;
        } catch (err: any) {
            switch (err.code) {
                case 'PROTOCOL_CONNECTION_LOST':
                    console.error(TAG_PROTOCOL_CONNECTION_LOST);
                    break;
                case 'ER_CON_COUNT_ERROR':
                    console.error(TAG_ER_CON_COUNT_ERROR);
                    break;
                case 'ECONNREFUSED':
                    console.error(TAG_ECONNREFUSED);
                    break;
                default:
                    console.error('Database connection error:', err);
            }
            throw err; // re-throw the error after logging it
        }
    }
};

export default connection;