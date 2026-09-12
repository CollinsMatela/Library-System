import express from 'express'
import Admin_LoginController from '../controllers/Admin_LoginController.js'

const router = express.Router()
router.post("/admin-login", Admin_LoginController);

export default router