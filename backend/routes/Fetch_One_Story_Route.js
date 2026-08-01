import express from 'express'
import Fetch_One_Story_Controller from '../controllers/Fetch_One_Story_Controller.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router();

router.get("/get-story/:id", generalLimiter, Fetch_One_Story_Controller);

export default router;