import express from "express";
import { createProfile, deleteProfile, getProfiles, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.route("/").get(getProfiles).post(createProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile);
export default router;

