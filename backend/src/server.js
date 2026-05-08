import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import messagesRouter from "./routes/messages.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./lib/logger.js";

const app = express();
const __dirname = path.resolve();

app.use(cookieParser());

// CORS is only needed in development where Vite (port 5173) and Express
// (port 3000) are different origins. In production, the frontend and backend
// share the same Vercel domain so the browser never sends an Origin header
// that needs to be validated — CORS middleware is simply skipped.
if (ENV.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth/", authRouter);
app.use("/api/messages/", messagesRouter);

app.use(errorHandler);

const PORT = ENV.PORT;

const startServer = async () => {
  await connectDB();
  if (ENV.NODE_ENV !== "production") {
    const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        logger.error(`Port ${PORT} is already in use. Stop the existing process or change PORT in your env.`);
      } else {
        logger.error("Server error:", err);
      }
    });
  }
};
startServer();

export default app;
