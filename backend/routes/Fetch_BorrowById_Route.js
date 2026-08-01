import express from "express";
import Fetch_BorrowById_Controller from "../controllers/Fetch_BorrowById_Controller.js";
import { generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get("/get-borrow/:userId", generalLimiter, Fetch_BorrowById_Controller);

export default router;