import express from 'express'
import SummarizationController from '../controllers/SummarizationController.js'

const router = express.Router();
router.post('/ai-summarization', SummarizationController);

export default router;