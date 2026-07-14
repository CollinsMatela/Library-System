import express from 'express'
import ApproveBorrowController from '../controllers/ApproveBorrowController.js'

const router = express.Router();

router.put('/approve-borrow', ApproveBorrowController);

export default router;