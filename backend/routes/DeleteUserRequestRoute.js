import express from 'express'
import DeleteUserRequestController from '../controllers/DeleteUserRequestController.js'
import { deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.delete('/delete-user-request/:id', deleteLimiter, DeleteUserRequestController);

export default router;