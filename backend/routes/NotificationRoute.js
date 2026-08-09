import express from 'express'
import {FetchNotification, BookUploadNotification, ApprovedNotification, BorrowedNotification, DueNotification, markAsReadNotification} from '../controllers/NotificationController.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.get('/fetch-notifications', generalLimiter, FetchNotification);
router.post('/upload-notification', generalLimiter, BookUploadNotification)

export default router;