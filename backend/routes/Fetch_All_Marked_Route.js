import express from 'express'
import Fetch_All_Marked_Controller from '../controllers/Fetch_All_Marked_Controller.js'

const router = express.Router();
router.get('/fetch-all-marked-stories', Fetch_All_Marked_Controller);

export default router;