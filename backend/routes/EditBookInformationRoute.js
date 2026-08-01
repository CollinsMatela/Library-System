import express from 'express';
import EditBookInformationController from '../controllers/EditBookInformationController.js';
import { updateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
router.put('/update-book/:bookId', updateLimiter, EditBookInformationController);

export default router;