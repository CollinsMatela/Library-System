import express from 'express'
import DeleteBorrowController from '../controllers/DeleteBorrowController.js'
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.delete('/delete-borrow/:id', deleteLimiter, DeleteBorrowController);

export default router;