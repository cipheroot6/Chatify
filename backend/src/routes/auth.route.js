import express from "express";
import { signUp, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.js";

const authRouter = express.Router();

authRouter.use(arcjetProtection);

authRouter.post("/sign-up", signUp);

authRouter.post("/login", arcjetProtection, login);

authRouter.post("/logout", logout);

authRouter.put("/update-profile", isAuthorized, updateProfile);

authRouter.get("/check", isAuthorized, (req, res) => res.status(200).json(req.user));

export default authRouter;