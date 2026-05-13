import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kool1010',
    database: process.env.DB_NAME || 'ifx_vms',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: '24h',
  },
};
