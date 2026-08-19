import express from 'express'
import { SendEmailController } from '../controllers/EmailController.js'

const router = express.Router();

router.post('/send-email', SendEmailController);

export default router