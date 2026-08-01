import express from 'express'
import DeleteBorrowController from '../controllers/DeleteBorrow_Controller.js'
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.delete('/delete-request/:requestId', deleteLimiter, DeleteBorrowController)

export default router;