import express from "express";
import { generateTest, getTest, getTests, submitTest } from "../controllers/testController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.post("/generate", generateTest);
router.get("/", getTests);
router.get("/:id", getTest);
router.post("/:id/submit", submitTest);
export default router;

