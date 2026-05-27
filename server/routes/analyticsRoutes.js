import express from "express";
import { overview, patterns, weakAreas } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.get("/overview", overview);
router.get("/patterns", patterns);
router.get("/weak-areas", weakAreas);
export default router;

