import express from 'express'
import {firstTime_Password, ChangePassword, Admin_FirstPassword, Admin_ChangePassword} from '../controllers/Change_Password_Controller.js'
import { changePassLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post("/first-password", changePassLimiter, firstTime_Password)
router.post("/change-password", changePassLimiter, ChangePassword)
router.post("/admin-first-password", changePassLimiter, Admin_FirstPassword)
router.post("/admin-change-password", changePassLimiter, Admin_ChangePassword)

export default router;