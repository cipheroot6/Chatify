import "dotenv/config";
import { logger } from "./logger.js";

export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  PORT: process.env.PORT || 3000,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_API_KEY: process.env.ARCJET_API_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_KEY: process.env.PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
};

// Validation
const requiredEnvVars = [
  "JWT_SECRET",
  "MONGO_URI",
  "BREVO_API_KEY",
  "CLIENT_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "ARCJET_API_KEY",
  "PUSHER_APP_ID",
  "PUSHER_KEY",
  "PUSHER_SECRET",
];

const missing = requiredEnvVars.filter((v) => !ENV[v]);
if (missing.length > 0) {
  logger.error(`FATAL: Missing environment variables: ${missing.join(", ")}`);
  if (ENV.NODE_ENV === "production") {
    process.exit(1);
  }
}
