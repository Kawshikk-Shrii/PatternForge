import { CONFIDENCE_PENALTY, DIFFICULTY_WEIGHT } from "./constants.js";

export const daysBetween = (date) => {
  if (!date) return 30;
  const diff = Date.now() - new Date(date).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

export const getPriorityScore = (problem, weakPatterns = []) => {
  const daysSinceLastRevision = daysBetween(problem.lastRevisedDate || problem.dateSolved);
  const difficultyWeight = DIFFICULTY_WEIGHT[problem.difficulty] || 1;
  const confidencePenalty = CONFIDENCE_PENALTY[problem.confidenceLevel] ?? 5;
  const revisionBonus = (problem.revisionCount || 0) * 2;
  const weakPatternPenalty = weakPatterns.includes(problem.pattern) ? 8 : 0;
  return daysSinceLastRevision + difficultyWeight + confidencePenalty + weakPatternPenalty - revisionBonus;
};

export const bucketPriority = (score) => {
  if (score >= 25) return "High Priority";
  if (score >= 12) return "Medium Priority";
  return "Low Priority";
};

export const getWeakPatterns = (problems) => {
  const grouped = problems.reduce((acc, problem) => {
    const key = problem.pattern || "Uncategorized";
    acc[key] ||= { pattern: key, total: 0, lowConfidence: 0, revisions: 0, score: 0 };
    acc[key].total += 1;
    acc[key].revisions += problem.revisionCount || 0;
    if (problem.confidenceLevel === "Low") acc[key].lowConfidence += 1;
    return acc;
  }, {});

  return Object.values(grouped)
    .map((item) => ({
      ...item,
      averageRevisions: item.total ? item.revisions / item.total : 0,
      weaknessScore: item.lowConfidence * 5 + Math.max(0, 4 - item.revisions / Math.max(1, item.total)) * 2
    }))
    .sort((a, b) => b.weaknessScore - a.weaknessScore);
};

