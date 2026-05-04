import { BrevoClient } from '@getbrevo/brevo';
import { ENV } from "./env.js";

const brevo = new BrevoClient({ 
    apiKey: ENV.BREVO_API_KEY 
});

export const sendEmail = async ({ to, subject, html }) => {
    return brevo.transactionalEmails.sendTransacEmail({
        subject: subject,
        htmlContent: html,
        sender: { 
            name: ENV.EMAIL_FROM_NAME, 
            email: ENV.EMAIL_FROM 
        },
        to: [{ 
            email: to
        }]
    });
};
