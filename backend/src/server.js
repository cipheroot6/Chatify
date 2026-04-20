import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import messagesRouter from "./routes/messages.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";

const app = express();
const __dirname = path.resolve();

app.use(cookieParser());

// In production (Vercel), the frontend and backend share the same origin via
// Vercel rewrites, so CORS headers aren't needed. We still configure it
// defensively using CLIENT_URL from env — no hardcoded URLs to maintain.
//
// In development, the Vite dev server runs on a different port (5173) so CORS
// is required. Note: axios uses relative URLs + Vite proxy so it never hits
// this CORS config in dev anyway, but it's here as a safety net.
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL].filter(Boolean)
    : ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin "${origin}" is not allowed`));
    },
  }),
);

app.use(express.json());

app.use("/api/auth/", authRouter);
app.use("/api/messages/", messagesRouter);

const PORT = ENV.PORT;

const startServer = async () => {
  await connectDB();
  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
};
startServer();

export default app;

// welcome emails needs to be fixed
