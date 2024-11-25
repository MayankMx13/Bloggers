import cloudinary from "../cloudinary.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const SECRET_KET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    let imageUrl = "";

    await cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "error",
        });
      }

      imageUrl = result.url;
    });

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      image: imageUrl,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      message: "user created Successfully",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    const age = 1000 * 60 * 60;

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: age,
    });

    res.status(200).json({
      message: "Login successful!",
      user: userInfo,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Unable to login. Please try again later." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User Not in the Database" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token: token }, { new: true });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<h3>Password Reset Request</h3>
          <p>Hi ${user.name},</p>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}">Reset Paassword</a>
          <p>If you did not request this, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }

      res.status(200).json({ message: "Reset link sent to your email" });
      navigate("/login");
      alert("Reset Link sent to mail");
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    const user = await User.findOne({ token });

    const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifytoken)
      return res.status(401).json({ message: "try again token is not valid" });

    const newPassword = await bcrypt.hash(password, 10);

    const userData = await User.findByIdAndUpdate(
      user._id,
      { $set: { password: newPassword, token: "" } },
      { new: true }
    ).lean();

    const { password: newPass, ...userinfo } = userData;

    return res
      .status(200)
      .json({ message: "Password reset Successfull!!", userinfo });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Received ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

export const getUsers = (req, res) => {
  try {
  } catch (error) {}
};
export const deleteUser = (req, res) => {
  try {
  } catch (error) {}
};
