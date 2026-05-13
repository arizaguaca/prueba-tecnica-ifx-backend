import mysql from 'mysql2/promise';
import { config } from '../../config/env';
import { pool } from './mysql';

export const initDb = async () => {
  // 1. Create a temporary connection without database to ensure it exists
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\``);
    console.log(`[database]: Database "${config.db.database}" verified/created.`);
  } catch (error) {
    console.error('[database]: Error creating database:', error);
    throw error;
  } finally {
    await connection.end();
  }

  // 2. Now that the DB exists, we can use the pool to create the table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS vms (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      os ENUM('Windows', 'Linux', 'Ubuntu') NOT NULL,
      ramGb INT NOT NULL,
      cpuCores INT NOT NULL,
      diskGb INT NOT NULL,
      status ENUM('Running', 'Stopped', 'Creating') NOT NULL,
      createdAt DATETIME NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('[database]: Table "vms" verified/created.');
  } catch (error) {
    console.error('[database]: Error initializing table:', error);
    throw error;
  }
};
