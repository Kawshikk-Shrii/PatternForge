import mongoose from "mongoose";

const mockTestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
    duration: { type: Number, required: true },
    filters: {
      difficulties: [{ type: String }],
      patterns: [{ type: String }],
      topics: [{ type: String }],
      platforms: [{ type: String }],
      preferPriority: { type: Boolean, default: true }
    },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    submittedAt: { type: Date },
    score: { type: Number, default: 0 },
    resultSummary: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("MockTest", mockTestSchema);

