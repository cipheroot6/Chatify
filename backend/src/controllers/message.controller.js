import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import cloudinary from "../lib/cloudinary.js";
import pusher from "../lib/pusher.js";

export const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const loggedInUserId = req.user._id;

    // Don't allow searching for yourself
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: loggedInUserId },
    }).select("_id fullName email profilePic");

    if (!user) {
      return res.status(404).json({ message: "No user found with that email address." });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getMessagesByUserId = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required" });
    }
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl;
    if (image) {
      // upload image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Check if this is the first message between these two users
    const existingCount = await Message.countDocuments({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    await message.save();

    const senderUser = await User.findById(senderId).select("fullName profilePic");

    const messagePayload = {
      ...message.toObject(),
      sender: { fullName: senderUser.fullName, profilePic: senderUser.profilePic },
    };

    await pusher.trigger(`private-user-${receiverId}`, "new-message", messagePayload);

    // Notify the receiver of a new chat partner if this is their first conversation
    if (existingCount === 0) {
      const senderInfo = await User.findById(senderId).select("_id fullName email profilePic");
      await pusher.trigger(`private-user-${receiverId}`, "new-chat-partner", senderInfo);
    }

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own messages" });
    }

    await message.deleteOne();

    await pusher.trigger(`private-user-${message.senderId}`, "message-deleted", { messageId });
    await pusher.trigger(`private-user-${message.receiverId}`, "message-deleted", { messageId });

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};

export const markMessagesAsRead = async (req, res, next) => {
  try {
    const { senderId } = req.params;
    const receiverId = req.user._id;

    await Message.updateMany(
      { senderId, receiverId, isRead: false },
      { isRead: true }
    );

    await pusher.trigger(`private-user-${senderId}`, "messages-read", {
      readBy: receiverId.toString(),
    });

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    next(error);
  }
};

export const getChatPartner = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged in user is either the sender or the receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = Array.from(
      new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    );

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    next(error);
  }
};

export const sendTypingStatus = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const { isTyping } = req.body;
    const senderId = req.user._id;

    await pusher.trigger(`private-user-${receiverId}`, "typing", {
      userId: senderId,
      isTyping,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
