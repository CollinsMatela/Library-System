import express from 'express'
import Fetch_One_Story_Controller from '../controllers/Fetch_One_Story_Controller.js'

const router = express.Router();

router.get("/get-story/:id", Fetch_One_Story_Controller);

export default router;