import express from 'express'
import Fetch_BookById_Controller from '../controllers/Fetch_BookById_Controller.js'

const router = express.Router();

router.get("/get-book/:id", Fetch_BookById_Controller);

export default router;
