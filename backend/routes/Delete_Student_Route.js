import express from "express";
import Delete_Student_Controller from "../controllers/Delete_Student_Controller.js";
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.delete("/delete-student/:id", deleteLimiter, Delete_Student_Controller);

export default router;