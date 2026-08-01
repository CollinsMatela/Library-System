import express from "express";
import Upload_Manually_Controller from "../controllers/Upload_Manully_Controller.js";
import { createLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
    "/upload-manually",
    createLimiter,
    Upload_Manually_Controller
);

export default router;