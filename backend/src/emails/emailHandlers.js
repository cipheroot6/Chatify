import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const sender = {
      name: process.env.EMAIL_FROM_NAME || "Chatify",
      email: process.env.EMAIL_FROM || "onboarding@resend.dev"
    };
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Messenger',
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error) {
        console.log("Error sending email:", error);
        throw new Error("Failed to send welcome email");
    }
    else {
        console.log("Welcome Email sent successfully:", data);
    }
}