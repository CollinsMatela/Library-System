import express from 'express'
import Fetch_BookById_Controller from '../controllers/Fetch_BookById_Controller.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.get("/get-book/:id", generalLimiter, Fetch_BookById_Controller);

export default router;
