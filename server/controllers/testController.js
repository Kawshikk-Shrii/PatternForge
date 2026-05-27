import asyncHandler from "express-async-handler";
import MockTest from "../models/MockTest.js";
import Problem from "../models/Problem.js";
import TestAttempt from "../models/TestAttempt.js";
import { getPriorityScore, getWeakPatterns } from "../utils/revisionScoring.js";

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export const generateTest = asyncHandler(async (req, res) => {
  const {
    title = "PatternForge Mock Test",
    questionCount = 5,
    duration = 60,
    difficulties = [],
    patterns = [],
    topics = [],
    platforms = [],
    preferPriority = true
  } = req.body;

  const query = { userId: req.user._id };
  if (difficulties.length) query.difficulty = { $in: difficulties };
  if (patterns.length) query.pattern = { $in: patterns };
  if (platforms.length) query.platform = { $in: platforms };
  if (topics.length) query.topics = { $in: topics };

  const problems = await Problem.find(query);
  if (!problems.length) {
    res.status(400);
    throw new Error("No solved problems match the selected filters");
  }

  const weakNames = getWeakPatterns(problems).slice(0, 5).map((item) => item.pattern);
  const candidates = preferPriority
    ? problems.map((problem) => ({ problem, score: getPriorityScore(problem, weakNames) })).sort((a, b) => b.score - a.score)
    : shuffle(problems).map((problem) => ({ problem, score: 0 }));

  const selected = shuffle(candidates.slice(0, Math.max(questionCount * 2, questionCount)))
    .slice(0, questionCount)
    .map((item) => item.problem._id);

  const test = await MockTest.create({
    userId: req.user._id,
    title,
    problems: selected,
    duration,
    filters: { difficulties, patterns, topics, platforms, preferPriority }
  });

  res.status(201).json(await test.populate("problems"));
});

export const getTests = asyncHandler(async (req, res) => {
  res.json(await MockTest.find({ userId: req.user._id }).populate("problems").sort({ createdAt: -1 }));
});

export const getTest = asyncHandler(async (req, res) => {
  const test = await MockTest.findOne({ _id: req.params.id, userId: req.user._id }).populate("problems");
  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }
  res.json(test);
});

export const submitTest = asyncHandler(async (req, res) => {
  const test = await MockTest.findOne({ _id: req.params.id, userId: req.user._id }).populate("problems");
  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  const statuses = req.body.problemStatuses || [];
  const solvedCount = statuses.filter((item) => item.status === "Solved").length;
  const attemptedCount = statuses.filter((item) => item.status === "Attempted").length;
  const skippedCount = statuses.filter((item) => item.status === "Skipped").length;
  const weakProblemIds = statuses
    .filter((item) => item.status === "Need revision" || item.status === "Attempted" || item.status === "Skipped")
    .map((item) => String(item.problem));
  const weakPatterns = [...new Set(test.problems.filter((problem) => weakProblemIds.includes(String(problem._id))).map((problem) => problem.pattern))];
  const score = Math.round((solvedCount / Math.max(1, test.problems.length)) * 100);

  const attempt = await TestAttempt.create({
    userId: req.user._id,
    testId: test._id,
    problemStatuses: statuses,
    solvedCount,
    attemptedCount,
    skippedCount,
    weakPatterns
  });

  test.status = "completed";
  test.submittedAt = new Date();
  test.score = score;
  test.resultSummary = { solvedCount, attemptedCount, skippedCount, weakPatterns };
  await test.save();

  res.status(201).json({ test, attempt, score, solvedCount, attemptedCount, skippedCount, weakPatterns });
});

