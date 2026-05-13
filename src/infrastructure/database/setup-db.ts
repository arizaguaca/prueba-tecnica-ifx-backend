import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setup = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const dbName = process.env.DB_NAME || 'ifx_vms';

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`[setup]: Database "${dbName}" ensured.`);
    
    await connection.query(`USE ${dbName}`);
    
    await connection.query(`
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
    `);
    console.log('[setup]: Table "vms" ensured.');

    // Optional: Seed initial data if table is empty
    const [rows]: any = await connection.query('SELECT COUNT(*) as count FROM vms');
    if (rows[0].count === 0) {
      console.log('[setup]: Seeding initial VMs...');
      const vms = [
        ['1', 'Prod-Web-Server', 'Ubuntu', 16, 4, 100, 'Running', new Date()],
        ['2', 'Dev-DB-Ubuntu', 'Ubuntu', 8, 2, 50, 'Stopped', new Date()],
        ['3', 'Win-Legacy-App', 'Windows', 32, 8, 500, 'Running', new Date()],
        ['4', 'Linux-Batch-Worker', 'Linux', 4, 2, 20, 'Creating', new Date()],
        ['5', 'Ubuntu-Test-Bench', 'Ubuntu', 8, 4, 80, 'Running', new Date()],
      ];
      await connection.query(
        'INSERT INTO vms (id, name, os, ramGb, cpuCores, diskGb, status, createdAt) VALUES ?',
        [vms]
      );
      console.log('[setup]: Seeded 5 VMs.');
    }

  } catch (error) {
    console.error('[setup]: Error during database setup:', error);
  } finally {
    await connection.end();
  }
};

setup();
