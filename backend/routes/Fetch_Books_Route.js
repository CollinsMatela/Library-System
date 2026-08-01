import express from 'express'
import Fetch_Books_Controller from '../controllers/Fetch_Books_Controller.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.get("/get-books", generalLimiter, Fetch_Books_Controller);

export default router;