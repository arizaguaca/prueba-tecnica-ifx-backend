import { createServer } from 'http';
import app from './app';
import { config } from './config/env';
import { testConnection } from './infrastructure/database/mysql';
import { initDb } from './infrastructure/database/init';
import { SocketService } from './infrastructure/socket/socket-service';

const httpServer = createServer(app);

const startServer = async () => {
  try {
    // Database Initialization
    await initDb();
    await testConnection();

    // Socket.io Initialization
    SocketService.init(httpServer);

    httpServer.listen(config.port, () => {
      console.log(`[server]: Server is running at http://localhost:${config.port}`);
      console.log(`[server]: Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('[server]: Error starting server:', error);
    process.exit(1);
  }
};

startServer();
