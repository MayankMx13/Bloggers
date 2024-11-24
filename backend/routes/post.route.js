import express from "express";
import upload from "../middleware/multer.js";
import {
  handler,
  createPost,
  getPost,
  getPosts,
  deletePost,
  getPostsByUser,
} from "../controller/post.controller.js";
const router = express.Router();

router.post("/create", upload.single("image"), createPost);

router.get("/:id", getPost);
router.get("/search/:query", handler);
router.get("/", getPosts);
router.get("/user/:userId", getPostsByUser);

router.delete("/:id", deletePost);

export default router;
