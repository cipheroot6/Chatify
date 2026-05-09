import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  deleteAccount,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import {
  arcjetProtection,
  pusherArcjetProtection,
  signUpArcjetProtection,
  loginArcjetProtection,
  emailArcjetProtection,
} from "../middlewares/arcjet.js";
import pusher from "../lib/pusher.js";
import { logger } from "../lib/logger.js";
import { validate } from "../middlewares/validate.js";
import {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "../schemas/auth.schema.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpArcjetProtection, validate(signUpSchema), signUp);

authRouter.post("/login", loginArcjetProtection, validate(loginSchema), login);

authRouter.get("/verify-email", emailArcjetProtection, verifyEmail);
authRouter.post(
  "/resend-verification",
  emailArcjetProtection,
  validate(forgotPasswordSchema),
  resendVerificationEmail,
);

authRouter.post(
  "/forgot-password",
  emailArcjetProtection,
  validate(forgotPasswordSchema),
  forgotPassword,
);
authRouter.post(
  "/reset-password",
  emailArcjetProtection,
  validate(resetPasswordSchema),
  resetPassword,
);

authRouter.post("/logout", arcjetProtection, logout);

authRouter.put("/update-profile", arcjetProtection, isAuthorized, updateProfile);
authRouter.put(
  "/change-password",
  arcjetProtection,
  isAuthorized,
  validate(changePasswordSchema),
  changePassword,
);
authRouter.delete("/delete-account", arcjetProtection, isAuthorized, deleteAccount);

authRouter.get("/check", arcjetProtection, isAuthorized, (req, res) =>
  res.status(200).json(req.user),
);

authRouter.post("/pusher/auth", pusherArcjetProtection, isAuthorized, (req, res) => {
  const { socket_id: socketId, channel_name: channel } = req.body;
  const user = req.user;

  // Presence channels require user identity in the auth response.
  // Private channels must NOT include it — the extra data corrupts the HMAC signature.
  const presenceData = channel.startsWith("presence-")
    ? { user_id: user._id.toString(), user_info: { name: user.fullName } }
    : undefined;

  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
});

// Pusher user authentication - required for private channels
authRouter.post("/pusher/user-auth", pusherArcjetProtection, isAuthorized, (req, res) => {
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
