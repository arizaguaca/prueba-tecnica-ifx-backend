import app from './app';
import { config } from './config/env';
import { testConnection } from './infrastructure/database/mysql';
import { initDb } from './infrastructure/database/init';

const startServer = async () => {
  try {
    // Database Initialization
    await initDb();
    await testConnection();

    app.listen(config.port, () => {
      console.log(`[server]: Server is running at http://localhost:${config.port}`);
      console.log(`[server]: Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('[server]: Error starting server:', error);
    process.exit(1);
  }
};

startServer();
