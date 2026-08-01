import express from 'express'
import SummarizationController from '../controllers/SummarizationController.js'
import { AISummarizationLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post('/ai-summarization', AISummarizationLimiter, SummarizationController);

export default router;