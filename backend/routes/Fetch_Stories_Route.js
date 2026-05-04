import express from 'express'
import Fetch_Stories_Controller from '../controllers/Fetch_Stories_Controller.js'

const router = express.Router();
router.get("/get-stories", Fetch_Stories_Controller);

export default router;