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

// CORS is only needed in development where Vite (port 5173) and Express
// (port 3000) are different origins. In production, the frontend and backend
// share the same Vercel domain so the browser never sends an Origin header
// that needs to be validated — CORS middleware is simply skipped.
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    }),
  );
}

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
