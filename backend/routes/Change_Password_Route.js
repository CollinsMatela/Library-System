import express from 'express'
import {firstTime_Password, ChangePassword} from '../controllers/Change_Password_Controller.js'
import { changePassLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post("/first-password", changePassLimiter, firstTime_Password)
router.post("/change-password", changePassLimiter, ChangePassword)

export default router;