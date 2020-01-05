import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  user: {
    type: String,
    required: "user is required"
  },
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
