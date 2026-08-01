import express from 'express'
import Fetch_AllBorrow_Controller from '../controllers/Fetch_AllBorrow_Controller.js';
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.get('/fetch-all-borrow', generalLimiter, Fetch_AllBorrow_Controller);

export default router;