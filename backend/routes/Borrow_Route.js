import express from 'express'
import Borrow_Controller from '../controllers/Borrow_Controller.js'
import { createLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.post('/request-borrow', createLimiter, Borrow_Controller);

export default router