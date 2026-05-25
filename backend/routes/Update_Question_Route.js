import express from 'express';
import Update_Question_Controller from '../controllers/Update_Question_Controller.js';

const router = express.Router();
router.put('/update-question/:storyId', Update_Question_Controller);

export default router;