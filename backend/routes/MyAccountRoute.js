import express from 'express'
import { generalLimiter } from '../middleware/rateLimiter.js'
import { ChangeProfileController } from '../controllers/MyAccountController.js';

const router = express.Router();

router.patch('/update-user-avatar', generalLimiter, ChangeProfileController);

export default router