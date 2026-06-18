import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.config';
import apiRouter from './routes';
import rateLimiter from './middleware/rate-limiter';
import globalErrorHandler from './middleware/error.middleware';
import logger from './utils/logger';

const app = express();

// Secure Express headers with Helmet
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parser rules - limits payload size to 10kb to avoid memory leaks/DDoS
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiter for API routes
app.use('/api', rateLimiter);

// Integrate HTTP Morgan request logging with Winston
const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};
const morganFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream: morganStream }));

// Mount API router
app.use('/api/v1', apiRouter);

// Catch-all route handler for undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Centralized Error Middleware
app.use(globalErrorHandler);

export default app;
