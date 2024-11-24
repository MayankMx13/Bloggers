import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
const DATABASE = process.env.DATABASE_URI;
const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: "https://bloggers-teal.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/user", userRoute);

const connectionToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log("connected backend");
    });
  } catch (error) {
    console.log(error);
  }
};

connectionToDatabase();
