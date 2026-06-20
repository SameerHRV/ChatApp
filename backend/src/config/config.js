import { config as conf } from "dotenv";

conf({
  path: "./.env",
});

const config = {
  port: process.env.PORT || 8000,
  mongodbDbName: process.env.MONGODB_URI_NAME,
  mongodbUri: process.env.MONGODB_URI,
  cors: process.env.CORS_ORIGIN,
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    url: process.env.IMAGEKIT_URL,
  },
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },
};

export const configdb = { ...config };
export default config;
