import mongoose from "mongoose";
import { PATTERNS } from "../utils/constants.js";

const patternAnalyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    pattern: { type: String, enum: PATTERNS, required: true },
    totalSolved: { type: Number, default: 0 },
    easyCount: { type: Number, default: 0 },
    mediumCount: { type: Number, default: 0 },
    hardCount: { type: Number, default: 0 },
    averageConfidence: { type: Number, default: 0 },
    totalRevisions: { type: Number, default: 0 },
    weakScore: { type: Number, default: 0 },
    lastCalculatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

patternAnalyticsSchema.index({ userId: 1, pattern: 1 }, { unique: true });

export default mongoose.model("PatternAnalytics", patternAnalyticsSchema);
