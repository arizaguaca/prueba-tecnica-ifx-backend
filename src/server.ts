import app from './app';
import { config } from './config/env';

const startServer = () => {
  try {
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
