import mysql from 'mysql2/promise';
import { config } from '../../config/env';

export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('[database]: MySQL connection established successfully.');
    connection.release();
  } catch (error) {
    console.error('[database]: Error connecting to MySQL:', error);
  }
};
