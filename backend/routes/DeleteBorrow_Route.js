import express from 'express'
import DeleteBorrowController from '../controllers/DeleteBorrow_Controller.js'

const router = express.Router();

router.delete('/delete-request/:requestId', DeleteBorrowController)

export default router;