import express from 'express'
import {FetchNotification, BookUploadNotification, ApprovedNotification, BorrowedNotification, DueNotification, RemoveRequestNotification} from '../controllers/NotificationController.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.get('/fetch-notifications', FetchNotification);
router.post('/upload-notification', BookUploadNotification);
router.post('/approved-notification', ApprovedNotification);
router.post('/borrowed-notification', BorrowedNotification);
router.post('/due-notifications', DueNotification);
router.post('/removed-notification', RemoveRequestNotification);

export default router;