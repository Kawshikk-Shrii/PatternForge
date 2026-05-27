import asyncHandler from "express-async-handler";
import Problem from "../models/Problem.js";
import { bucketPriority, getPriorityScore, getWeakPatterns } from "../utils/revisionScoring.js";

export const recommended = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ userId: req.user._id });
  const weakNames = getWeakPatterns(problems).slice(0, 5).map((item) => item.pattern);
  const scored = problems
    .map((problem) => {
      const priorityScore = getPriorityScore(problem, weakNames);
      return { problem, priorityScore, bucket: bucketPriority(priorityScore) };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  res.json({
    reviseToday: scored.slice(0, 5),
    highPriority: scored.filter((item) => item.bucket === "High Priority"),
    mediumPriority: scored.filter((item) => item.bucket === "Medium Priority"),
    lowPriority: scored.filter((item) => item.bucket === "Low Priority"),
    recentlyRevised: problems
      .filter((problem) => problem.lastRevisedDate)
      .sort((a, b) => new Date(b.lastRevisedDate) - new Date(a.lastRevisedDate))
      .slice(0, 8)
  });
});

export const markRevised = asyncHandler(async (req, res) => {
  const { confidenceLevel } = req.body;
  const problem = await Problem.findOne({ _id: req.params.problemId, userId: req.user._id });
  if (!problem) {
    res.status(404);
    throw new Error("Problem not found");
  }
  problem.lastRevisedDate = new Date();
  problem.revisionCount += 1;
  if (confidenceLevel) problem.confidenceLevel = confidenceLevel;
  await problem.save();
  res.json(problem);
});

