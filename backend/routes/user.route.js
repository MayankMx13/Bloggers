import express from "express";
import upload from "../middleware/multer.js";
import {
  createUser,
  getUsers,
  deleteUser,
  loginUser,
  forgotPassword,
  logoutUser,
  getUserById,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/createUser", upload.single("image"), createUser);
router.get("/:id", getUserById);
router.post("/forgot", forgotPassword);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
