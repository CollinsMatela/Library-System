import express from "express";
import EditBookPageController from "../controllers/EditBookPageController.js";
import upload from "../config/multer.js";
import { updateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
router.put("/update-page", updateLimiter, upload.any(), EditBookPageController);
export default router;