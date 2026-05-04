import { logger } from "../lib/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  // Log the full error in development only
  if (process.env.NODE_ENV !== "production") {
    logger.error(`[${req.method}] ${req.path} —`, err);
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
