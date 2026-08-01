import FetchLogBookController from '../controllers/FetchLogBookController.js'
import express from 'express'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.get("/get-all-logbook", generalLimiter, FetchLogBookController);

export default router;