import asyncHandler from "express-async-handler";
import MockTest from "../models/MockTest.js";
import Problem from "../models/Problem.js";
import { getPriorityScore, getWeakPatterns } from "../utils/revisionScoring.js";

export const overview = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ userId: req.user._id });
  const tests = await MockTest.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(5);
  const weakPatterns = getWeakPatterns(problems).slice(0, 5);
  const weakNames = weakPatterns.map((item) => item.pattern);
  const revisionDue = problems
    .map((problem) => ({ problem, priorityScore: getPriorityScore(problem, weakNames) }))
    .filter((item) => item.priorityScore >= 12)
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const byDifficulty = problems.reduce((acc, problem) => {
    acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
    return acc;
  }, { Easy: 0, Medium: 0, Hard: 0 });

  const byPattern = problems.reduce((acc, problem) => {
    acc[problem.pattern] = (acc[problem.pattern] || 0) + 1;
    return acc;
  }, {});

  const solvedDates = new Set(problems.map((problem) => problem.dateSolved?.toISOString().slice(0, 10)));
  res.json({
    totalSolved: problems.length,
    byDifficulty,
    byPattern,
    recentActivity: problems.slice(-6).reverse(),
    revisionDueCount: revisionDue.length,
    revisionDue: revisionDue.slice(0, 6),
    weakPatterns,
    mockTests: tests,
    streak: solvedDates.size
  });
});

export const patterns = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ userId: req.user._id });
  const weakPatterns = getWeakPatterns(problems);
  const analytics = weakPatterns.map((item) => {
    const patternProblems = problems.filter((problem) => problem.pattern === item.pattern);
    const distribution = patternProblems.reduce((acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      return acc;
    }, { Easy: 0, Medium: 0, Hard: 0 });
    const averagePriority =
      patternProblems.reduce((sum, problem) => sum + getPriorityScore(problem), 0) / Math.max(1, patternProblems.length);
    return { ...item, distribution, averagePriority: Math.round(averagePriority) };
  });
  res.json(analytics);
});

export const weakAreas = asyncHandler(async (req, res) => {
  const problems = await Problem.find({ userId: req.user._id });
  res.json(getWeakPatterns(problems).slice(0, 8));
});

