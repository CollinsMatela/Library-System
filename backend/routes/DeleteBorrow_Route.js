import express from 'express'
import DeleteBorrow_Controller from '../controllers/DeleteBorrow_Controller.js'
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.delete('/delete-request/:requestId', DeleteBorrow_Controller)

export default router;