import express from 'express'
import ApproveBorrowController from '../controllers/ApproveBorrowController.js'
import { updateLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.put('/approve-borrow', updateLimiter, ApproveBorrowController);

export default router;