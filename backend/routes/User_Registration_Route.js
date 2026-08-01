import express from "express";
import User_Registration_Controller from "../controllers/User_Registration_Controller.js";
import { registrationLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
router.post("/register-user", registrationLimiter, User_Registration_Controller);

export default router;