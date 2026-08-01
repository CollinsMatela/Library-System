import express from "express";
import  LogBookController  from "../controllers/LogBookController.js";
import { createLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.post("/register-visitor", createLimiter, LogBookController);

export default router;