import mongoose from "mongoose";

const codingProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    platform: { type: String, required: true, enum: ["LeetCode", "Codeforces", "CodeChef", "HackerRank"] },
    username: { type: String, required: true, trim: true },
    profileUrl: { type: String, default: "" },
    totalSolved: { type: Number, default: 0 },
    rating: { type: String, default: "" },
    lastSynced: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("CodingProfile", codingProfileSchema);

