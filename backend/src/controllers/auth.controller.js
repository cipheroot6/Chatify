import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { ENV } from "../lib/env.js";
import { sendWelcomeEmail, sendVerificationEmail, sendPasswordResetEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import pusher from "../lib/pusher.js";
import { logger } from "../lib/logger.js";
import { generateRawToken, hashToken, tokenExpiry } from "../lib/tokens.js";

export const signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const rawToken = generateRawToken();
    const hashedToken = hashToken(rawToken);

    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationExpires = tokenExpiry(24);

    if (newUser) {
      await newUser.save();
      
      try {
        // Send both the welcome email and the verification email sequentially
        const verificationURL = `${ENV.CLIENT_URL}/verify-email?token=${rawToken}`;
        await sendWelcomeEmail(email, fullName, ENV.CLIENT_URL);
        await sendVerificationEmail(email, fullName, verificationURL);
      } catch (error) {
        logger.error("Error sending emails:", error);
      }

      res.status(201).json({
        message: "Account created. Please check your email to verify your account.",
        email,
      });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        needsVerification: true,
        email: user.email,
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateData = {};

    if (req.body.profilePic) {
      const userResponse = await cloudinary.uploader.upload(req.body.profilePic);
      updateData.profilePic = userResponse.secure_url;
    }
    if (req.body.fullName) {
      updateData.fullName = req.body.fullName;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// --- Add these to the bottom of auth.controller.js ---

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

    const hashedToken = hashToken(token);

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    // Issue the JWT and log them in automatically
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 even if user doesn't exist to prevent email enumeration
      return res.status(200).json({ message: "If that email exists, a new link has been sent." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "This account is already verified." });
    }

    const rawToken = generateRawToken();
    user.emailVerificationToken = hashToken(rawToken);
    user.emailVerificationExpires = tokenExpiry(24);
    await user.save();

    const verificationURL = `${ENV.CLIENT_URL}/verify-email?token=${rawToken}`;
    await sendVerificationEmail(user.email, user.fullName, verificationURL);

    res.status(200).json({ message: "If that email exists, a new link has been sent." });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Always return 200 to prevent email enumeration
      return res.status(200).json({ message: "If that email exists, a password reset link has been sent." });
    }

    const rawToken = generateRawToken();
    user.resetPasswordToken = hashToken(rawToken);
    user.resetPasswordExpires = tokenExpiry(1); // 1 hour expiration
    await user.save();

    const resetURL = `${ENV.CLIENT_URL}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(user.email, user.fullName, resetURL);

    res.status(200).json({ message: "If that email exists, a password reset link has been sent." });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = hashToken(token);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token. Please request a new one.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful. Please log in." });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await Message.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    await User.findByIdAndDelete(userId);

    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const pusherChannelAuth = async (req, res, next) => {
  try {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const user = req.user; // Assuming your protectRoute middleware sets req.user

    // Authorize the user to join this specific private channel
    const authResponse = pusher.authorizeChannel(socketId, channel, {
      user_id: user._id.toString(),
      user_info: {
        fullName: user.fullName,
        email: user.email,
      },
    });
    
    res.send(authResponse);
  } catch (error) {
    next(error);
  }
};

export const pusherUserAuth = async (req, res, next) => {
  try {
    const socketId = req.body.socket_id;
    const user = req.user; 

    // Tell Pusher who this user globally is
    const authResponse = pusher.authenticateUser(socketId, {
      id: user._id.toString(),
      name: user.fullName,
    });
    
    res.send(authResponse);
  } catch (error) {
    next(error);
  }
};