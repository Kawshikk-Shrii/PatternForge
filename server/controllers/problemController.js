import asyncHandler from "express-async-handler";
import Problem from "../models/Problem.js";

export const getProblems = asyncHandler(async (req, res) => {
  const query = { userId: req.user._id };
  if (req.query.difficulty) query.difficulty = req.query.difficulty;
  if (req.query.pattern) query.pattern = req.query.pattern;
  const problems = await Problem.find(query).sort({ dateSolved: -1 });
  res.json(problems);
});

export const createProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.create({ ...req.body, userId: req.user._id });
  res.status(201).json(problem);
});

export const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ _id: req.params.id, userId: req.user._id });
  if (!problem) {
    res.status(404);
    throw new Error("Problem not found");
  }
  res.json(problem);
});

export const updateProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!problem) {
    res.status(404);
    throw new Error("Problem not found");
  }
  res.json(problem);
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!problem) {
    res.status(404);
    throw new Error("Problem not found");
  }
  res.json({ message: "Problem deleted" });
});

export const importDemoProblems = asyncHandler(async (req, res) => {
  const samples = [
    ["Longest Repeating Character Replacement", "LeetCode", "Medium", ["String"], "Sliding Window", "Low"],
    ["Find First and Last Position", "LeetCode", "Medium", ["Array"], "Binary Search", "Medium"],
    ["Clone Graph", "LeetCode", "Medium", ["Graph"], "Graph BFS", "Low"],
    ["Coin Change", "LeetCode", "Medium", ["DP"], "Dynamic Programming", "Medium"],
    ["Daily Temperatures", "LeetCode", "Medium", ["Stack"], "Stack", "High"],
    ["Minimum Window Substring", "LeetCode", "Hard", ["String"], "Sliding Window", "Low"]
  ];

  const existingTitles = new Set((await Problem.find({ userId: req.user._id }).select("title")).map((problem) => problem.title));
  const docs = samples
    .filter(([title]) => !existingTitles.has(title))
    .map(([title, platform, difficulty, topics, pattern, confidenceLevel], index) => ({
      userId: req.user._id,
      title,
      platform,
      difficulty,
      topics,
      pattern,
      confidenceLevel,
      problemUrl: `https://example.com/problems/${title.toLowerCase().replaceAll(" ", "-")}`,
      dateSolved: new Date(Date.now() - (index + 10) * 86400000),
      notes: "Imported demo problem. Replace with your own notes after revision.",
      approach: `Recognize the ${pattern} pattern and write down the key invariant.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    }));

  const created = docs.length ? await Problem.insertMany(docs) : [];
  res.status(201).json({ message: `Imported ${created.length} demo problems`, problems: created });
});
