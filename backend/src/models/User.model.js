import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
        default: null,
    },
    emailVerificationExpires: {
        type: Date,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
    },
}
, {
    timestamps: true, // createdAt, updatedAt
});


const User = mongoose.model('User', userSchema);

export default User;