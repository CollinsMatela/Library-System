import express from 'express'
import ReturnBorrowController from '../controllers/ReturnBorrowController.js'

const router = express.Router();

router.put('/return-borrow', ReturnBorrowController);

export default router;