import express from "express";
import EditBookPageController from "../controllers/EditBookPageController.js";
import { updateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
router.put("/update-page", updateLimiter, EditBookPageController);

export default router;