import mongoose from "mongoose";
import cloudinary from "../cloudinary.js";
import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    let imageUrl = "";

    await cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "error",
        });
      }

      imageUrl = result.url;
    });

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tag: req.body.tag,
      imageUrl: imageUrl,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "name image");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log(post.author);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch the post", error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name image");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "error fetching data" });
  }
};

export const handler = async (req, res) => {
  const { query } = req.params;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {};

export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const posts = await Post.find({ author: userId }).populate("author");

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
