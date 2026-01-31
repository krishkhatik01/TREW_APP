import mongoose from "mongoose";

const loopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  media : { type: String, required: true }, 
  captions: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ body: String, date: Date }],

}, { timestamps: true });

const Loop = mongoose.model("Loop", loopSchema);
export default Loop;