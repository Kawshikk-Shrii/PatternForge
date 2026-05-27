import asyncHandler from "express-async-handler";
import CodingProfile from "../models/CodingProfile.js";

export const getProfiles = asyncHandler(async (req, res) => {
  res.json(await CodingProfile.find({ userId: req.user._id }).sort({ platform: 1 }));
});

export const createProfile = asyncHandler(async (req, res) => {
  const profile = await CodingProfile.create({ ...req.body, userId: req.user._id, lastSynced: new Date() });
  res.status(201).json(profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await CodingProfile.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!profile) {
    res.status(404);
    throw new Error("Coding profile not found");
  }
  res.json(profile);
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await CodingProfile.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!profile) {
    res.status(404);
    throw new Error("Coding profile not found");
  }
  res.json({ message: "Coding profile deleted" });
});

