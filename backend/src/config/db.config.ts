import env from './env.config';

export const dbConfig = {
  url: env.DATABASE_URL,
  options: {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
};

export default dbConfig;
