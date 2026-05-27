import mongoose from "mongoose";
import { PATTERNS } from "../utils/constants.js";

const problemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    platform: { type: String, required: true },
    problemUrl: { type: String, default: "" },
    difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] },
    topics: [{ type: String, trim: true }],
    pattern: { type: String, enum: PATTERNS, required: true },
    dateSolved: { type: Date, default: Date.now },
    lastRevisedDate: { type: Date },
    revisionCount: { type: Number, default: 0 },
    confidenceLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    notes: { type: String, default: "" },
    approach: { type: String, default: "" },
    mistakes: { type: String, default: "" },
    keyPatternLearned: { type: String, default: "" },
    timeComplexity: { type: String, default: "" },
    spaceComplexity: { type: String, default: "" },
    codeSnippet: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);

