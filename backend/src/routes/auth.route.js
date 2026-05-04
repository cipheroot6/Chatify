import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.js";
import pusher from "../lib/pusher.js";
import { logger } from "../lib/logger.js";
import { validate } from "../middlewares/validate.js";
import { signUpSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validate(signUpSchema), signUp);

authRouter.post("/login", validate(loginSchema), login);

authRouter.get("/verify-email", verifyEmail);
authRouter.post("/resend-verification", validate(forgotPasswordSchema), resendVerificationEmail);

authRouter.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
authRouter.post("/reset-password", validate(resetPasswordSchema), resetPassword);

authRouter.post("/logout", logout);

authRouter.put("/update-profile", isAuthorized, updateProfile);

authRouter.get("/check", isAuthorized, (req, res) =>
  res.status(200).json(req.user),
);

authRouter.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const authResponse = pusher.authorizeChannel(socketId, channel);
  res.send(authResponse);
});

// Pusher user authentication - required for private channels
authRouter.post("/pusher/user-auth", isAuthorized, (req, res) => {
  const socketId = req.body.socket_id || req.body.socketId;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!socketId) {
    return res.status(400).json({ message: "Missing socket_id" });
  }

  // pusher.authenticateUser expects an object, not a JSON string
  const userData = {
    id: user._id.toString(),
    user_info: {
      name: user.fullName,
      email: user.email,
    },
  };

  try {
    const authResponse = pusher.authenticateUser(socketId, userData);
    res.send(authResponse);
  } catch (error) {
    logger.error("Pusher auth error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export default authRouter;
