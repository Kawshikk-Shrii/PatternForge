import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const authResponse = (user) => ({
  token: signToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    collegeCompany: user.collegeCompany,
    preferredPlatforms: user.preferredPlatforms,
    createdAt: user.createdAt
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, collegeCompany, preferredPlatforms } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error("Email is already registered");
  }

  const user = await User.create({ name, email, password, collegeCompany, preferredPlatforms });
  res.status(201).json(authResponse(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json(authResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out successfully" });
});
