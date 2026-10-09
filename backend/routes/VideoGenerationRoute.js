import express from 'express'
import VideoController from '../controllers/VideoController.js'
import { AIVideoLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post('/video-generation', AIVideoLimiter, VideoController)

export default router