import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartner,
} from "../controllers/message.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.js";

const messagesRouter = express.Router();

// these middlewares execute in order - so req get rate limited first and then authenticated this is more efficient since
// auth req get rate limited before hitting auth route
messagesRouter.use(arcjetProtection, isAuthorized);

messagesRouter.get("/contact", getAllContacts);
messagesRouter.get("/chats", getChatPartner);
messagesRouter.get("/:id", getMessagesByUserId);
messagesRouter.post("/send/:id", sendMessage);

export default messagesRouter;
