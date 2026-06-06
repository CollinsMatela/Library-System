import express from 'express';
import  MarkAsRead  from '../controllers/MarkAsRead_Controller.js';
const router = express.Router();

router.post('/mark-as-read', MarkAsRead);

export default router;