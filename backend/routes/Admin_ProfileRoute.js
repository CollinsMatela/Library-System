import express from 'express'
import { generalLimiter, updateLimiter } from '../middleware/rateLimiter.js'
import { FetchAdminProfileController, UpdateAdminProfileController } from '../controllers/Admin_ProfileController.js'

const router = express.Router();

router.get("/admin-profile/:id", generalLimiter, FetchAdminProfileController);
router.put("/update-admin-avatar/:id", updateLimiter, UpdateAdminProfileController);

export default router