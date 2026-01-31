import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
 
  userName: { type: String, required: true, unique: true }, 
  
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String },
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  following: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  loops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loop" }],
  story: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  resetOtp: { type: Number },
  resetOtpExpire: { type: Date },
  isOtpVerified: { type: Boolean, default: false }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;