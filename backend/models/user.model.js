import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  image: { type: String },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

export const User = mongoose.model("User", UserSchema);
