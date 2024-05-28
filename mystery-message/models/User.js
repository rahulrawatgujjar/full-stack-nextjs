import mongoose, { Schema, Document } from "mongoose";


const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please use a vaild email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"]
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
})


const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)

export default UserModel;