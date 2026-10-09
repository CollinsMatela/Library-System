import express from "express";
import SavePageVideoController from "../controllers/SavePageVideoController.js";
import { updateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Final approval: save the generated video to Cloudinary and the database.
router.put("/save-page-video", updateLimiter, SavePageVideoController);

export default router;
