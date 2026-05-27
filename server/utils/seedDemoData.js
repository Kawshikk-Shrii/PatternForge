import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import CodingProfile from "../models/CodingProfile.js";
import MockTest from "../models/MockTest.js";
import Problem from "../models/Problem.js";
import TestAttempt from "../models/TestAttempt.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const demoProblems = [
  ["Longest Substring Without Repeating Characters", "LeetCode", "Medium", ["String", "Hash Map"], "Sliding Window", "Low", 1, 18],
  ["Two Sum", "LeetCode", "Easy", ["Array", "Hash Map"], "Hashing", "High", 4, 5],
  ["Search in Rotated Sorted Array", "LeetCode", "Medium", ["Array"], "Binary Search", "Medium", 2, 13],
  ["Number of Islands", "LeetCode", "Medium", ["Matrix", "Graph"], "Graph DFS", "Low", 0, 31],
  ["Climbing Stairs", "LeetCode", "Easy", ["DP"], "Dynamic Programming", "Medium", 3, 8],
  ["Merge Intervals", "LeetCode", "Medium", ["Intervals", "Sorting"], "Greedy", "Medium", 1, 20],
  ["Valid Parentheses", "HackerRank", "Easy", ["String"], "Stack", "High", 5, 2],
  ["Course Schedule", "LeetCode", "Medium", ["Graph", "Topological Sort"], "Graph BFS", "Low", 1, 27],
  ["Subarray Sum Equals K", "LeetCode", "Medium", ["Array", "Prefix"], "Prefix Sum", "Low", 0, 22],
  ["LRU Cache", "LeetCode", "Hard", ["Design", "Linked List"], "Linked List", "Medium", 1, 35],
  ["Kth Largest Element", "Codeforces", "Medium", ["Heap"], "Heap", "Medium", 2, 11],
  ["N Queens", "CodeChef", "Hard", ["Search"], "Backtracking", "Low", 0, 45]
];

const seed = async () => {
  await Promise.all([User.deleteMany({ email: "demo@patternforge.dev" })]);
  const user = await User.create({
    name: "Demo Learner",
    email: "demo@patternforge.dev",
    password: "password123",
    collegeCompany: "PatternForge University",
    preferredPlatforms: ["LeetCode", "Codeforces"]
  });

  await CodingProfile.insertMany([
    { userId: user._id, platform: "LeetCode", username: "demo_dsa", profileUrl: "https://leetcode.com/demo_dsa", totalSolved: 286, rating: "Knight" },
    { userId: user._id, platform: "Codeforces", username: "pattern_demo", profileUrl: "https://codeforces.com/profile/pattern_demo", totalSolved: 174, rating: "1392" },
    { userId: user._id, platform: "HackerRank", username: "revision_builder", profileUrl: "https://hackerrank.com/revision_builder", totalSolved: 62, rating: "5 star" }
  ]);

  const now = Date.now();
  const problems = await Problem.insertMany(
    demoProblems.map(([title, platform, difficulty, topics, pattern, confidenceLevel, revisionCount, daysAgo]) => ({
      userId: user._id,
      title,
      platform,
      difficulty,
      topics,
      pattern,
      confidenceLevel,
      revisionCount,
      problemUrl: `https://example.com/problems/${title.toLowerCase().replaceAll(" ", "-")}`,
      dateSolved: new Date(now - (daysAgo + 12) * 86400000),
      lastRevisedDate: revisionCount ? new Date(now - daysAgo * 86400000) : undefined,
      notes: `Remember the invariant for ${pattern}.`,
      approach: `Identify ${pattern}, write the state/condition, then dry run edge cases.`,
      mistakes: "Forgot one boundary case during the first solve.",
      keyPatternLearned: pattern,
      timeComplexity: difficulty === "Hard" ? "O(n log n)" : "O(n)",
      spaceComplexity: "O(n)",
      codeSnippet: "// Add your clean final solution here"
    }))
  );

  await MockTest.deleteMany({ userId: user._id });
  await TestAttempt.deleteMany({ userId: user._id });
  await MockTest.create({
    userId: user._id,
    title: "Graph and DP Refresh",
    problems: problems.slice(3, 7).map((problem) => problem._id),
    duration: 75,
    filters: { difficulties: ["Medium"], patterns: ["Graph DFS", "Graph BFS", "Dynamic Programming"], platforms: ["LeetCode"], preferPriority: true }
  });

  console.log("Demo data seeded: demo@patternforge.dev / password123");
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

