import express from "express";
import { createProblem, deleteProblem, getProblem, getProblems, importDemoProblems, updateProblem } from "../controllers/problemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.route("/").get(getProblems).post(createProblem);
router.post("/import-demo", importDemoProblems);
router.route("/:id").get(getProblem).put(updateProblem).delete(deleteProblem);
export default router;
