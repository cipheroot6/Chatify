import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            maxlength: 1024,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ createdAt: -1 });
// Compound index for the exact query used in getMessagesByUserId:
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;