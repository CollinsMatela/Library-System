import express from 'express'
import Login_Controller from '../controllers/Login_Controller.js'

const router = express.Router();
router.post(`/login`, Login_Controller);

export default router;