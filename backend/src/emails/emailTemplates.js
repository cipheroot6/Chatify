export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chatify</title>
  </head>
  <body style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f1f5f9;">
    <div style="background: linear-gradient(to right, #0f172a, #1e293b); padding: 35px 20px; text-align: center; border-radius: 12px 12px 0 0; border-bottom: 4px solid #06b6d4;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Chatify<span style="color: #06b6d4;">.</span></h1>
    </div>
    <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 18px; color: #0f172a;"><strong>Hello ${name},</strong></p>
      <p>We're excited to have you join our messaging platform! Chatify connects you with friends, family, and colleagues in real-time.</p>
      
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #06b6d4;">
        <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Get started in just a few steps:</strong></p>
        <ul style="padding-left: 20px; margin: 0; color: #475569;">
          <li style="margin-bottom: 10px;">Set up your profile picture</li>
          <li style="margin-bottom: 10px;">Find and add your contacts</li>
          <li style="margin-bottom: 10px;">Start a conversation</li>
          <li style="margin-bottom: 0;">Share photos instantly</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${clientURL}" style="background-color: #06b6d4; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Open Chatify</a>
      </div>
      
      <p style="margin-bottom: 5px; color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
      <p style="margin-top: 0; word-break: break-all; color: #06b6d4; font-size: 14px;">${clientURL}</p>

      <p style="margin-top: 30px; margin-bottom: 0;">Happy messaging!</p>
      <p style="margin-top: 5px; margin-bottom: 0;"><strong>The Chatify Team</strong></p>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 13px;">
      <p style="margin: 0 0 10px 0;">© 2025 Chatify. All rights reserved.</p>
      <p style="margin: 0;">Don't want to receive these emails? <a href="#" style="color: #94a3b8; text-decoration: underline;">Unsubscribe here</a>.</p>
    </div>
  </body>
  </html>
  `;
}

export function createVerificationEmailTemplate(name, verificationURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your Email</title>
  </head>
  <body style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f1f5f9;">
    <div style="background: linear-gradient(to right, #0f172a, #1e293b); padding: 35px 20px; text-align: center; border-radius: 12px 12px 0 0; border-bottom: 4px solid #06b6d4;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Chatify<span style="color: #06b6d4;">.</span></h1>
    </div>
    <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h2 style="margin-top: 0; color: #0f172a; font-size: 22px;">Verify your email address</h2>
      <p style="font-size: 16px; color: #334155;"><strong>Hello ${name},</strong></p>
      <p>Thank you for signing up for Chatify. Please verify your email address to get access to your account.</p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${verificationURL}" style="background-color: #06b6d4; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Verify Email</a>
      </div>
      
      <p style="margin-bottom: 5px; color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
      <p style="margin-top: 0; word-break: break-all; color: #06b6d4; font-size: 14px;">${verificationURL}</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
        <p style="margin-bottom: 5px;"><strong>Note:</strong> This verification link will expire in 24 hours.</p>
        <p style="margin-top: 0;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 13px;">
      <p style="margin: 0;">© 2025 Chatify. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
}

export function createPasswordResetEmailTemplate(name, resetURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
  </head>
  <body style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f1f5f9;">
    <div style="background: linear-gradient(to right, #0f172a, #1e293b); padding: 35px 20px; text-align: center; border-radius: 12px 12px 0 0; border-bottom: 4px solid #06b6d4;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Chatify<span style="color: #06b6d4;">.</span></h1>
    </div>
    <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h2 style="margin-top: 0; color: #0f172a; font-size: 22px;">Reset your password</h2>
      <p style="font-size: 16px; color: #334155;"><strong>Hello ${name},</strong></p>
      <p>We received a request to reset the password for your Chatify account. Click the button below to choose a new password.</p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetURL}" style="background-color: #06b6d4; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Reset Password</a>
      </div>
      
      <p style="margin-bottom: 5px; color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
      <p style="margin-top: 0; word-break: break-all; color: #06b6d4; font-size: 14px;">${resetURL}</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
        <p style="margin-bottom: 5px;"><strong style="color: #ef4444;">Warning:</strong> This link will expire in 1 hour.</p>
        <p style="margin-top: 0;">If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 13px;">
      <p style="margin: 0;">© 2025 Chatify. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
}