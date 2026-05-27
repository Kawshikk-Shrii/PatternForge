import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "MockTest", required: true },
    problemStatuses: [
      {
        problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
        status: { type: String, enum: ["Solved", "Attempted", "Skipped", "Need revision"], default: "Skipped" }
      }
    ],
    solvedCount: { type: Number, default: 0 },
    attemptedCount: { type: Number, default: 0 },
    skippedCount: { type: Number, default: 0 },
    weakPatterns: [{ type: String }],
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("TestAttempt", testAttemptSchema);

