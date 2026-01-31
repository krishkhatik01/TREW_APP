import { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaType: { type: String, enum: ["image", "video", "text"], required: true},
  media : { type: String, required: true }, 
  captions: { type: String },
  image: { type: String },
  likes: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: 0 },
  comments: [{ body: String, date: Date }],

}, { timestamps: true });

const post = mongoose.model("Post", postSchema);
export default post;