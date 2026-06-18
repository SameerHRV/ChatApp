import { createServer } from 'http';
import app from './app';
import env from './config/env.config';
import { connectDB } from './db';
import socketService from './services/socket.service';
import logger from './utils/logger';

// Handle synchronous uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.stack || `${err.name}: ${err.message}`);
  process.exit(1);
});

const server = createServer(app);

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Bind Socket.io to Server
  socketService.init(server);

  // Start Listener
  server.listen(env.PORT, () => {
    logger.info(`
🚀 Server running on port ${env.PORT}
🌍 Environment: ${env.NODE_ENV}
📍 API URL: http://localhost:${env.PORT}/api/v1
    `);
  });
};

startServer();

// Handle asynchronous unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logger.error('💥 UNHANDLED REJECTION! Gracefully shutting down...');
  logger.error(err.stack || `${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
