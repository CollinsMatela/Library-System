import express from 'express'
import ReturnBorrowController from '../controllers/ReturnBorrowController.js'
import { updateLimiter } from '../middleware/rateLimiter.js'
const router = express.Router();

router.put('/return-borrow', updateLimiter, ReturnBorrowController);

export default router;