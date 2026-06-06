import express from 'express';
import Fetch_MarkAsRead_Controller from '../controllers/Fetch_MarkAsRead_Controller.js';

const router = express.Router();
router.get(`/fetch-mark-as-read`, Fetch_MarkAsRead_Controller);

export default router;