import UpdateLeaveController from "../controllers/UpdateLeaveController.js";
import express from 'express';
import { updateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
router.put("/update-leave", updateLimiter, UpdateLeaveController);

export default router