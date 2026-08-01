import express from 'express'
import Login_Controller from '../controllers/Login_Controller.js'
import { loginLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();
router.post(`/login`, loginLimiter, Login_Controller);

export default router;