import express from 'express'
import DeleteBorrowController from '../controllers/DeleteBorrowController.js'

const router = express.Router();
router.delete('/delete-borrow/:id', DeleteBorrowController);

export default router;