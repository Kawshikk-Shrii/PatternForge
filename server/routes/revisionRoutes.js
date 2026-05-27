import express from "express";
import { markRevised, recommended } from "../controllers/revisionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.get("/recommended", recommended);
router.put("/:problemId/mark-revised", markRevised);
export default router;

