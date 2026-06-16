import express from 'express'
import Fetch_StoryBooks_Controller from '../controllers/Fetch_StoryBooks_Controller.js'

const router = express.Router();
router.get("/get-storybooks", Fetch_StoryBooks_Controller);

export default router;