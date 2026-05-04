import { sendEmail } from "../lib/brevo.js";
import { logger } from "../lib/logger.js";
import {
  createWelcomeEmailTemplate,
  createVerificationEmailTemplate,
  createPasswordResetEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  await sendEmail({
    to: email,
    subject: "Welcome to Chatify",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  logger.info(`Welcome email sent to ${email}`);
};

export const sendVerificationEmail = async (email, name, verificationURL) => {
  await sendEmail({
    to: email,
    subject: "Verify your Chatify email",
    html: createVerificationEmailTemplate(name, verificationURL),
  });
  logger.info(`Verification email sent to ${email}`);
};

export const sendPasswordResetEmail = async (email, name, resetURL) => {
  await sendEmail({
    to: email,
    subject: "Reset your Chatify password",
    html: createPasswordResetEmailTemplate(name, resetURL),
  });
  logger.info(`Password reset email sent to ${email}`);
};