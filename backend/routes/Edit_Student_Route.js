import express from "express";
import Edit_Student_Controller from "../controllers/Edit_Student_Controller.js";
import { updateLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.put("/update-student-account/:id", updateLimiter, Edit_Student_Controller)

export default router;