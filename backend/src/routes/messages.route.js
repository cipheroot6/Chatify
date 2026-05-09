import express from "express";
import {
  findUserByEmail,
  getMessagesByUserId,
  sendMessage,
  getChatPartner,
  deleteMessage,
  markMessagesAsRead,
  sendTypingStatus,
} from "../controllers/message.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { arcjetProtection, searchArcjetProtection } from "../middlewares/arcjet.js";
import { validate } from "../middlewares/validate.js";
import { findUserByEmailSchema } from "../schemas/auth.schema.js";

const messagesRouter = express.Router();

// these middlewares execute in order - so req get rate limited first and then authenticated this is more efficient since
// auth req get rate limited before hitting auth route
messagesRouter.use(arcjetProtection, isAuthorized);

messagesRouter.post("/find-user", searchArcjetProtection, validate(findUserByEmailSchema), findUserByEmail);
messagesRouter.get("/chats", getChatPartner);
messagesRouter.get("/:id", getMessagesByUserId);
messagesRouter.post("/send/:id", sendMessage);
messagesRouter.post("/typing/:id", sendTypingStatus);
messagesRouter.put("/read/:senderId", markMessagesAsRead);
messagesRouter.delete("/:messageId", deleteMessage);

export default messagesRouter;
