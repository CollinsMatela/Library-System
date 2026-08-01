import express from 'express'
import Change_Password_Controller from '../controllers/Change_Password_Controller.js'
import { changePassLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post("/change-password", changePassLimiter, Change_Password_Controller)

export default router;